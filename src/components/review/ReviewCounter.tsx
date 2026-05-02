import { useEffect, useRef, useState } from "react";
import {
  REVIEW_COUNTER_START,
  REVIEW_COUNTER_TICK_MS,
  REVIEW_COUNTER_COLORS,
  REVIEW_COUNTER_TRACK_COLOR,
} from "@/constants";

interface ReviewCounterProps {
  onComplete?: () => void;
}

export default function ReviewCounter({ onComplete }: ReviewCounterProps) {
  const start = REVIEW_COUNTER_START;
  const tickMs = REVIEW_COUNTER_TICK_MS;
  const colors = REVIEW_COUNTER_COLORS;
  const trackColor = REVIEW_COUNTER_TRACK_COLOR;

  const dialRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [time, setTime] = useState(start);

  useEffect(() => {
    const el = dialRef.current;
    if (!el) return;

    let startTime = performance.now();
    let lastSecondIdx = -1;

    const loop = (now: number) => {
      const elapsed = now - startTime;
      const total = start * tickMs;

      if (elapsed >= total) {
        el.style.setProperty("--angle", "360deg");
        setTime(0);
        onComplete?.();
        return;
      }

      const secIdx = Math.floor(elapsed / tickMs);
      const secElapsed = elapsed - secIdx * tickMs;
      const frac = secElapsed / tickMs;
      const angle = frac * 360;

      el.style.setProperty("--angle", `${angle}deg`);

      if (secIdx !== lastSecondIdx) {
        lastSecondIdx = secIdx;
        const color = colors[secIdx] ?? colors[colors.length - 1];
        el.style.setProperty("--fillColor", color);
        setTime(start - secIdx);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    el.style.setProperty("--angle", "0deg");
    el.style.setProperty("--fillColor", colors[0] ?? "#2ecc71");
    el.style.setProperty("--trackColor", trackColor);

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
