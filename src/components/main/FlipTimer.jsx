import "@/assets/css/flip.css";
import FlipCounter from "./FlipCounter";
import { getSecUntilMidnight } from "@/utils/flipTimer";

import { useEffect, useState } from "react";

export default function FlipTimer({ autoStart = true }) {
  const [seconds, setSeconds] = useState(getSecUntilMidnight());

  // 타이머 동작
  useEffect(() => {
    if (!autoStart) return;

    const id = setInterval(() => {
      setSeconds(getSecUntilMidnight());
    }, 1000);

    return () => clearInterval(id);
  }, [autoStart]);

  // 시간 분해
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  // 각 자리수로 분리
  const h1 = Math.floor(hours / 10);
  const h2 = hours % 10;
  const m1 = Math.floor(minutes / 10);
  const m2 = minutes % 10;
  const s1 = Math.floor(secs / 10);
  const s2 = secs % 10;

  return (
    <div className="flip-timer">
      {/* HH */}
      <FlipCounter counter={h1} />
      <FlipCounter counter={h2} />

      <img
        src="/src/assets/img/flipColon.svg"
        alt="colon"
        className="flip-colon"
      />

      {/* mm */}
      <FlipCounter counter={m1} />
      <FlipCounter counter={m2} />

      <img
        src="/src/assets/img/flipColon.svg"
        alt="colon"
        className="flip-colon"
      />

      {/* ss */}
      <FlipCounter counter={s1} />
      <FlipCounter counter={s2} />
    </div>
  );
}
