const NOTES = [
  ["You’re not fluent yet.", "That’s kind of the point."],
  ["Five sentences a day.", "No panic required."],
  ["Swipe your fear away.", "Write now, overthink later."],
];

// 시안(Figma 86:26) 실측 — 밴드 179px = py 40 + 제목 18 + gap 30 + 항목 51 + py 40.
// 배경은 순수 #000이다. 프로젝트 black 토큰(#2b2b2b)과 다르므로 토큰을 쓰지 않는다.
export default function CardDisclaimer() {
  return (
    <div
      className="h-[11.1875rem] bg-[#000] pt-[2.5rem] pr-[1.625rem] pl-[1.75rem] text-white"
      data-band="disclaimer"
    >
      <p className="font-roboto text-[1.5rem] leading-[1.125rem]">
        NTC Card is not a credit card
      </p>
      <ol className="font-roboto mt-[1.875rem] flex w-[41.875rem] gap-[1.25rem] text-[1rem] leading-[1.0625rem]">
        {NOTES.map(([first, second], i) => (
          <li key={first} className="w-[13.125rem] shrink-0">
            <p>{i + 1}.</p>
            <p>{first}</p>
            <p>{second}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
