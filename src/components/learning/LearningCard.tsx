import upperArrow from "@/assets/img/upperArrow.svg";
import WordToggleBtn from "./WordToggleBtn";
import wordIcon from "@/assets/img/wordIcon.svg";
import Modal from "@/components/common/Modal/Modal";
import BorderBtn from "@/components/common/BorderBtn";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import type { RefObject } from "react";
import { gsap } from "gsap";
import { useModal } from "@/hooks/useModal";
import { SCROLL_REVEAL_THRESHOLD } from "@/constants";
import type { Word } from "@/types";

type LearningPhase = "intro" | "reveal";

interface LearningCardProps {
  scrollRef: RefObject<HTMLDivElement | null>;
  onNext?: () => void;
  onPhaseChange?: (phase: LearningPhase) => void;
  ko: string;
  en: string;
  words?: Word[];
  onScrollProgress?: (progress: number) => void;
  isLoggedIn?: boolean;
  currentStep: number;
}

export default function LearningCard({
  scrollRef,
  onNext,
  onPhaseChange,
  ko,
  en,
  words = [],
  onScrollProgress,
  isLoggedIn = true,
  currentStep,
}: LearningCardProps) {
  const [isToggled, setIsToggled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const learningModal = useModal();

  const containerRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const englishRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const viewToggleRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const shouldDisplay = scrollProgress >= SCROLL_REVEAL_THRESHOLD;

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
          "<",
        )
        .fromTo(
          englishRef.current,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.4, ease: "none" },
        )
        .fromTo(
          buttonRef.current,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.3, ease: "none" },
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
        tlRef.current!.progress(progress);
        setScrollProgress(progress);

        if (progress < SCROLL_REVEAL_THRESHOLD) onPhaseChange?.("intro");
        else onPhaseChange?.("reveal");
      }

      onScrollProgress?.(progress);
    };

    scroller.addEventListener("scroll", onScroll);
    onScroll();

    return () => scroller.removeEventListener("scroll", onScroll);
  }, [scrollRef, onPhaseChange, isLoggedIn, onScrollProgress]);

  // step 바뀌면 리셋
  useEffect(() => {
    setIsToggled(false);
    setScrollProgress(0);
  }, [currentStep]);

  const handleGotItClick = () => {
    if (currentStep === 5) {
      learningModal.open();
    } else {
      onNext?.();
    }
  };

  // 영어 문장에서 특정 단어들을 하이라이트
  const highlightWords = (text: string, wordsToHighlight: Word[]) => {
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
            (word) => word.toLowerCase() === part.toLowerCase(),
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
      {/* GSAP autoAlpha로 제어 — 항상 DOM에 존재 */}
      <div
        ref={viewToggleRef}
        className="absolute top-[1.438rem] right-0 flex flex-row items-center gap-[0.875rem] cursor-pointer font-roboto en-body-sm text-gray3"
      >
        {isToggled ? "Words Hide" : "View Words"}
        <WordToggleBtn checked={isToggled} onChange={setIsToggled} />
      </div>

      <div
        className={`relative mt-[6rem] lg:mt-[9.625rem] flex flex-col items-center transition-transform duration-500 ease-out ${
          isToggled && shouldDisplay ? "-translate-y-[1.875rem]" : ""
        }`}
      >
        <p className="ko-headline-xl text-center leading-[3.125rem]">{ko}</p>

        <div
          ref={hintRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-4 items-center font-chakra font-semibold text-[1.125rem] leading-[1.125rem]"
        >
          <img src={upperArrow} alt="" className="w-[30px] h-[17px]" />
          <span className="whitespace-nowrap">Scroll to check English</span>
        </div>

        <div className="flex flex-col items-center gap-[2.125rem]">
          {/* GSAP autoAlpha로 제어 — 항상 DOM에 존재 */}
          <p
            ref={englishRef}
            className="text-[2.625rem] text-center font-roboto font-normal leading-[52.4px]"
          >
            {isToggled ? highlightWords(en, words) : en}
          </p>

          {isToggled && shouldDisplay && (
            <div className="animate-fade-in transition-opacity duration-300 flex gap-[2.75rem] items-center">
              {words.map((word, index) => (
                <div key={index} className="flex items-center gap-[0.3rem]">
                  <img
                    src={wordIcon}
                    alt=""
                    className="w-[9.68px] h-[9.93px]"
                  />
                  <div className="flex items-baseline gap-2 leading-none">
                    <span className="en-body-md leading-none">{word.en}</span>
                    <span className="ko-headline-sm leading-none">
                      {word.ko}
                    </span>
                  </div>
                </div>
              ))}
              {words.length === 0 && (
                <div className="text-gray-500 italic">
                  No words for this one!
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* GSAP autoAlpha로 제어 — 항상 DOM에 존재 */}
      <div className="absolute bottom-[2rem] lg:bottom-[3.875rem] left-1/2 -translate-x-1/2">
        <BorderBtn
          ref={buttonRef}
          text="Got it"
          px="px-[1.563rem]"
          py="py-[0.813rem]"
          onClick={handleGotItClick}
          className="border-black font-roboto text-[1.25rem] leading-[1.25rem]"
        />
      </div>

      <Modal
        type="learning"
        isOpen={learningModal.isOpen}
        onClose={() => learningModal.close()}
      />
    </div>
  );
}
