import upperArrow from "@/assets/img/upperArrow.svg";
import WorldToggleBtn from "./WordToggleBtn";
import wordIcon from "@/assets/img/wordIcon.svg";
import Modal from "@/components/common/Modal/Modal";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useModal } from "@/hooks/useModal";

export default function StepCard({
  scrollRef,
  onNext,
  onPhaseChange,
  ko,
  en,
  words = [],
  onScrollProgress,
  isLoggedIn = true,
  currentStep,
}) {
  const [isToggled, setIsToggled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const learningModal = useModal();

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

      if (isLoggedIn) {
        tlRef.current.progress(progress);
        setScrollProgress(progress);

        if (progress < 0.3) onPhaseChange?.("intro");
        else onPhaseChange?.("reveal");
      }

      onScrollProgress?.(progress);
    };

    scroller.addEventListener("scroll", onScroll);
    onScroll();

    return () => scroller.removeEventListener("scroll", onScroll);
  }, [scrollRef, onPhaseChange]);

  // 페이지가 변경될 때마다 toggle 상태 초기화
  useEffect(() => {
    setIsToggled(false);
  }, [ko, en, words]);

  // Got it 버튼 핸들러
  const handleGotItClick = () => {
    if (currentStep === 5) {
      learningModal.open();
    } else {
      onNext?.();
    }
  };

  // 영어 문장에서 특정 단어들을 하이라이트
  const highlightWords = (text, wordsToHighlight) => {
    if (!wordsToHighlight || wordsToHighlight.length === 0) {
      return <span>{text}</span>;
    }

    const englishWords = wordsToHighlight.map((word) => word.en);
    const regex = new RegExp(`\\b(${englishWords.join("|")})\\b`, "gi");
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, index) => {
          const isHighlighted = englishWords.some(
            (word) => word.toLowerCase() === part.toLowerCase()
          );
          return isHighlighted ? (
            <span key={index} className="bg-lightyellow">
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          );
        })}
      </span>
    );
  };

  return (
    <div
      ref={containerRef}
      className="sticky top-0 h-[60vh] min-h-[20rem] max-h-[30rem] flex flex-col items-center px-8 relative"
    >
      <div
        ref={viewToggleRef}
        type="button"
        className="absolute top-[1.438rem] right-0 flex flex-row items-center gap-[0.875rem] cursor-pointer font-roboto text-body-sm text-gray3"
      >
        {isToggled ? "Words Hide" : "View Words"}
        <WorldToggleBtn checked={isToggled} onChange={setIsToggled} />
      </div>

      <div
        className={`relative mt-[6rem] lg:mt-[9.625rem] flex flex-col items-center transition-transform duration-500 ease-out ${
          isToggled ? "-translate-y-[1.875rem]" : ""
        }`}
      >
        <p className="font-pretendard font-medium text-ko-headline-xl leading-[3.125rem] tracking-ko-headline text-center">
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
            {isToggled ? highlightWords(en, words) : en}
          </p>

          {isToggled && scrollProgress >= 0.3 && (
            <div className="animate-fade-in transition-opacity duration-300 flex gap-[2.75rem] items-center">
              {words.map((word, index) => (
                <div key={index} className="flex items-center gap-[0.3rem]">
                  <img
                    src={wordIcon}
                    alt=""
                    className="w-[9.68px] h-[9.93px]"
                  />
                  <div className="flex items-baseline gap-2 leading-none">
                    <span className="font-medium text-body-md leading-none">
                      {word.en}
                    </span>
                    <span className="font-medium text-ko-headline-sm font-pretendard leading-none">
                      {word.ko}
                    </span>
                  </div>
                </div>
              ))}
              {words.length === 0 && (
                <div className="text-gray-500 italic">No words to display</div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-[2rem] lg:bottom-[3.875rem] left-1/2 -translate-x-1/2">
        <button
          ref={buttonRef}
          onClick={handleGotItClick}
          className="px-6 py-[0.625rem] font-roboto rounded-[2.5rem] border border-black text-[1.25rem] hover:bg-lightyellow"
        >
          Got it
        </button>
      </div>

      <Modal
        type="learning"
        isOpen={learningModal.isOpen}
        onClose={() => learningModal.close()}
      />
    </div>
  );
}
