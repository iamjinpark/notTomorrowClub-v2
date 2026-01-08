import "@/assets/css/flip.css";

export default function FlipCounter({ counter = 0 }) {
  const current = ((counter % 10) + 10) % 10;
  const next = (current + 1) % 10;

  return (
    <ul className="flip-ul" aria-label={`flip digit ${current}`}>
      {Array.from({ length: 10 }, (_, num) => {
        const isFront = num === current;
        const isBack = num === next;

        const className = isFront ? "front" : isBack ? "back" : "";

        return (
          <li key={num} className={className}>
            <div className="upper">
              <div className="num">{num}</div>
            </div>
            <div className="lower">
              <div className="num">{num}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
