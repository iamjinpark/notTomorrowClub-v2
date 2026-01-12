import { useEffect, useRef, useState } from "react";

export default function ReviewCounter() {
  const start = 3;
  const tickMs = 1000;
  const colors = ["#F5FF76", "#F5FF76", "#F5FF76"];
  const trackColor = "#dcdcdc";

  const dialRef = useRef(null);
  const rafRef = useRef(0);
  const [time, setTime] = useState(start);

  useEffect(() => {
    const el = dialRef.current;
    if (!el) return;

    let startTime = performance.now();
    let lastSecondIdx = -1;

    const loop = (now) => {
      const elapsed = now - startTime;
      const total = start * tickMs;

      if (elapsed >= total) {
        el.style.setProperty("--angle", "360deg");
        setTime(0);
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
