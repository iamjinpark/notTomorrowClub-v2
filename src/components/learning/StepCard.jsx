import upperArrow from "@/assets/img/upperArrow.svg";
import WorldToggleBtn from "./WordToggleBtn";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export default function StepCard({ scrollRef, onNext, onPhaseChange, ko, en }) {
  const [isToggled, setIsToggled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef(null);
  const hintRef = useRef(null);
  const englishRef = useRef(null);
  const buttonRef = useRef(null);
  const viewToggleRef = useRef(null);
  const tlRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(hintRef.current, { autoAlpha: 1, y: 150 });
      gsap.set(englishRef.current, { autoAlpha: 0, y: 40 });
      gsap.set(buttonRef.current, { autoAlpha: 0, y: 30 });
      gsap.set(viewToggleRef.current, { autoAlpha: 0, y: -20 });

      const tl = gsap.timeline({ paused: true });

      tl.to(hintRef.current, {
        autoAlpha: 0,
        y: 100,
        duration: 0.3,
        ease: "none",
      })
        .fromTo(
          viewToggleRef.current,
          { autoAlpha: 0, y: -20 },
          { autoAlpha: 1, y: 0, duration: 0.2, ease: "none" },
          "<"
        )
        .fromTo(
          englishRef.current,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.4, ease: "none" }
        )
        .fromTo(
          buttonRef.current,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.3, ease: "none" }
        );

      tlRef.current = tl;
    }, containerRef);

    return () => {
      tlRef.current?.kill();
      tlRef.current = null;
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const scroller = scrollRef?.current;
    if (!scroller || !tlRef.current) return;

    const onScroll = () => {
      const maxScroll = scroller.scrollHeight - scroller.clientHeight;
      const progress = maxScroll <= 0 ? 0 : scroller.scrollTop / maxScroll;

      tlRef.current.progress(progress);
      setScrollProgress(progress);

      if (progress < 0.3) onPhaseChange?.("intro");
      else onPhaseChange?.("reveal");
    };

    scroller.addEventListener("scroll", onScroll);
    onScroll();

    return () => scroller.removeEventListener("scroll", onScroll);
  }, [scrollRef, onPhaseChange]);

  return (
    <div
      ref={containerRef}
      className="sticky top-0 h-[30.125rem] flex flex-col items-center px-8 relative"
    >
      <div
        ref={viewToggleRef}
        type="button"
        className="absolute top-[1.438rem] right-0 flex flex-row items-center gap-[0.875rem] cursor-pointer font-roboto font-medium text-[1.125rem] text-gray3"
      >
        {isToggled ? "Words Hide" : "View Words"}
        <WorldToggleBtn checked={isToggled} onChange={setIsToggled} />
      </div>

      <div
        className={`relative mt-[9.625rem] flex flex-col items-center transition-transform duration-500 ease-out ${
          isToggled ? "-translate-y-3" : ""
        }`}
      >
        <p className="font-pretendard font-medium text-[2.375rem] leading-[3.125rem] tracking-tight text-center">
          {ko}
        </p>

        <div
          ref={hintRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-4 items-center text-lg font-chakra font-semibold"
        >
          <img src={upperArrow} alt="" className="w-[30px] h-[17px]" />
          <span>Scroll to check English</span>
        </div>

        <div className="flex flex-col items-center gap-[2.125rem]">
          <p
            ref={englishRef}
            className="text-[2.625rem] text-center font-roboto font-medium leading-[52.4px]"
          >
            {en}
          </p>

          {isToggled && scrollProgress >= 0.3 && (
            <div className="animate-fade-in transition-opacity duration-300">
              words gonna be here
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-[3.875rem] left-1/2 -translate-x-1/2">
        <button
          ref={buttonRef}
          onClick={onNext}
          className="px-6 py-[0.625rem] font-roboto rounded-[2.5rem] border border-black text-[1.25rem]"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
