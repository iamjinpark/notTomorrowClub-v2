import { useEffect, useRef, useState } from "react";
import {
  REVIEW_COUNTER_START,
  REVIEW_COUNTER_TICK_MS,
  REVIEW_COUNTER_FILL_COLOR,
  REVIEW_COUNTER_TRACK_COLOR,
} from "@/constants";

interface ReviewCounterProps {
  onComplete?: () => void;
}

export default function ReviewCounter({ onComplete }: ReviewCounterProps) {
  const dialRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [time, setTime] = useState(REVIEW_COUNTER_START);

  useEffect(() => {
    const el = dialRef.current;
    if (!el) return;

    let startTime = performance.now();
    let lastSecondIdx = -1;

    const loop = (now: number) => {
      const elapsed = now - startTime;
      const total = REVIEW_COUNTER_START * REVIEW_COUNTER_TICK_MS;

      if (elapsed >= total) {
        el.style.setProperty("--angle", "360deg");
        setTime(0);
        onComplete?.();
        return;
      }

      const secIdx = Math.floor(elapsed / REVIEW_COUNTER_TICK_MS);
      const secElapsed = elapsed - secIdx * REVIEW_COUNTER_TICK_MS;
      const frac = secElapsed / REVIEW_COUNTER_TICK_MS;
      const angle = frac * 360;

      el.style.setProperty("--angle", `${angle}deg`);

      if (secIdx !== lastSecondIdx) {
        lastSecondIdx = secIdx;
        setTime(REVIEW_COUNTER_START - secIdx);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    el.style.setProperty("--angle", "0deg");
    el.style.setProperty("--fillColor", REVIEW_COUNTER_FILL_COLOR);
    el.style.setProperty("--trackColor", REVIEW_COUNTER_TRACK_COLOR);

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);

    // startTime과 lastSecondIdx는 effect 내부에서만 관리
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid place-items-center bg-transparent">
      <div
        ref={dialRef}
        className="en-title-xl w-16.5 h-16.5 grid place-items-center select-none rounded-full text-black will-change-[background] transition-[background] duration-150 ease-linear"
        style={{
          background:
            "conic-gradient(var(--fillColor) var(--angle), var(--trackColor) var(--angle))",
        }}
      >
        {time > 0 ? time : 0}
      </div>
    </div>
  );
}
