import upperArrow from "@/assets/img/upperArrow.svg";
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Step1({ scrollRef, onNext, onPhaseChange }) {
  const containerRef = useRef(null);
  const hintRef = useRef(null);
  const englishRef = useRef(null);
  const buttonRef = useRef(null);

  const tlRef = useRef(null);

  // 1) timeline 만들기 (한 번만)
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 초기 상태
      gsap.set(hintRef.current, { autoAlpha: 1, y: 150 });
      gsap.set(englishRef.current, { autoAlpha: 0, y: 40 });
      gsap.set(buttonRef.current, { autoAlpha: 0, y: 30 });

      const tl = gsap.timeline({ paused: true });

      tl.to(hintRef.current, {
        autoAlpha: 0,
        y: 100,
        duration: 0.3,
        ease: "none",
      })
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

  // 2) 스크롤 -> progress 반영
  useEffect(() => {
    const scroller = scrollRef?.current;
    if (!scroller || !tlRef.current) return;

    const onScroll = () => {
      const maxScroll = scroller.scrollHeight - scroller.clientHeight;
      const progress = maxScroll <= 0 ? 0 : scroller.scrollTop / maxScroll;

      tlRef.current.progress(progress);

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
      className="sticky top-0 h-[30.125rem] flex flex-col items-center px-8"
    >
      <div className="relative mt-[9.625rem] flex flex-col items-center">
        <p className="font-pretendard font-medium text-[2.375rem] leading-[3.125rem] tracking-tight text-center">
          저 공룡은 엄청나게 커!
        </p>

        <div
          ref={hintRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-4 items-center text-lg font-chakra font-semibold"
        >
          <img src={upperArrow} alt="" className="w-[30px] h-[17px]" />
          <span>Scroll to check English</span>
        </div>

        <p
          ref={englishRef}
          className="text-[2.625rem] text-center font-roboto font-medium leading-[52.4px]"
        >
          That dinosaur is ginormous!
        </p>
      </div>

      <div className="mt-[7.438rem]">
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
