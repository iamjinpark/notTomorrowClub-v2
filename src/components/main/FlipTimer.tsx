import "@/assets/css/flip.css";
import FlipCounter from "./FlipCounter";
import { getSecUntilMidnight } from "@/utils/flipTimer";
import flipColon from "@/assets/img/flipColon.svg";

import { useEffect, useState } from "react";

interface FlipTimerProps {
  autoStart?: boolean;
}

export default function FlipTimer({ autoStart = true }: FlipTimerProps) {
  const [seconds, setSeconds] = useState(getSecUntilMidnight());

  useEffect(() => {
    if (!autoStart) return;

    const id = setInterval(() => {
      setSeconds(getSecUntilMidnight());
    }, 1000);

    return () => clearInterval(id);
  }, [autoStart]);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

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

      <img src={flipColon} alt="colon" className="flip-colon" />

      {/* mm */}
      <FlipCounter counter={m1} />
      <FlipCounter counter={m2} />

      <img src={flipColon} alt="colon" className="flip-colon" />

      {/* ss */}
      <FlipCounter counter={s1} />
      <FlipCounter counter={s2} />
    </div>
  );
}
