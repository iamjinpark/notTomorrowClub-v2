import { useState } from "react";
import closeIcon from "@/assets/icon/close-1.svg";
import leftIcon from "@/assets/icon/direction-left.svg";
import rightIcon from "@/assets/icon/direction-right.svg";

interface DateRangeCalendarContentProps {
  onClose: () => void;
  onApply: (from: Date, to: Date) => void;
}

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function fmt(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${m}/${day}`;
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function DateRangeCalendarContent({
  onClose,
  onApply,
}: DateRangeCalendarContentProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [view, setView] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevLast = new Date(year, month, 0).getDate();
  const cells = [
    // 이전 달 날짜로 앞쪽 채움 (표시만, text-yellow)
    ...Array.from({ length: firstWeekday }, (_, i) => ({
      day: prevLast - firstWeekday + 1 + i,
      inMonth: false,
    })),
    ...Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      inMonth: true,
    })),
  ];

  const isDisabled = (day: number) => new Date(year, month, day) > today;

  const pick = (day: number) => {
    if (isDisabled(day)) return;
    const d = new Date(year, month, day);
    if (!start || end) {
      setStart(d);
      setEnd(null);
    } else if (d < start) {
      setStart(d);
    } else {
      setEnd(d);
    }
  };

  const isStart = (day: number) =>
    !!start && sameDay(new Date(year, month, day), start);
  const isEnd = (day: number) =>
    !!end && sameDay(new Date(year, month, day), end);
  const isEdge = (day: number) => isStart(day) || isEnd(day);
  const isBetween = (day: number) => {
    if (!start || !end) return false;
    const d = new Date(year, month, day);
    return d > start && d < end;
  };

  const label = !start
    ? "Select Date"
    : end
      ? `${fmt(start)} ~ ${fmt(end)}`
      : `${fmt(start)} ~`;

  return (
    <div className="bg-lightyellow flex h-[538px] w-[675px] flex-col px-10 pb-8 pt-6">
      <button onClick={onClose} aria-label="닫기" className="self-end">
        <img src={closeIcon} alt="" className="size-7" />
      </button>

      <div className="mt-2 flex items-center justify-between px-6">
        <button
          onClick={() => setView(new Date(year, month - 1, 1))}
          aria-label="이전 달"
        >
          <img src={leftIcon} alt="" className="size-6" />
        </button>
        <span className="en-title-lg text-black">
          {view.toLocaleString("en-US", { month: "long" })} {year}
        </span>
        <button
          onClick={() => setView(new Date(year, month + 1, 1))}
          aria-label="다음 달"
        >
          <img src={rightIcon} alt="" className="size-6" />
        </button>
      </div>

      <div className="en-title-sm text-black mx-auto mt-6 grid w-[445px] grid-cols-7 text-center">
        {WEEKDAYS.map((w, i) => (
          <span key={i} className="py-2">
            {w}
          </span>
        ))}
      </div>

      <div className="en-title-sm mx-auto mt-1 grid h-[280px] w-[445px] grid-cols-7 grid-rows-6 text-center">
        {cells.map((c, i) => {
          if (!c.inMonth) {
            return (
              <span
                key={i}
                className="text-yellow flex items-center justify-center"
              >
                {c.day}
              </span>
            );
          }
          const day = c.day;
          const disabled = isDisabled(day);
          const col = new Date(year, month, day).getDay();
          // 같은 줄에서만 green 연결 (토요일=끝 칸/일요일=첫 칸에선 가장자리로 안 샘)
          const startConnects = isStart(day) && !!end && col !== 6;
          const endConnects = isEnd(day) && col !== 0;
          return (
            <button
              key={i}
              type="button"
              onClick={() => pick(day)}
              disabled={disabled}
              className="relative flex items-center justify-center"
            >
              {/* 범위 green 바 (셀 사이 연결) */}
              {isBetween(day) && (
                <span className="bg-green absolute inset-y-0 left-0 right-0 my-auto h-[30px]" />
              )}
              {startConnects && (
                <span className="bg-green absolute inset-y-0 right-0 my-auto h-[30px] w-1/2" />
              )}
              {endConnects && (
                <span className="bg-green absolute inset-y-0 left-0 my-auto h-[30px] w-1/2" />
              )}
              {/* 30x30 날짜 네모 */}
              <span
                className={`relative z-10 flex h-[30px] w-[30px] items-center justify-center ${
                  isEdge(day)
                    ? "bg-charcoal text-white"
                    : disabled
                      ? "text-gray4"
                      : "text-black"
                }`}
              >
                {day}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        disabled={!start}
        onClick={() => start && onApply(start, end ?? start)}
        className={`mx-auto mt-8 rounded-full px-12 py-3 en-button-1 ${
          start
            ? "bg-charcoal text-white"
            : "border border-gray3 text-gray3"
        }`}
      >
        {label}
      </button>
    </div>
  );
}

export default DateRangeCalendarContent;
