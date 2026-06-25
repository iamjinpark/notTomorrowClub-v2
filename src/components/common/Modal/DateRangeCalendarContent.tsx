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

  const cells: (number | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
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

  const isEdge = (day: number) => {
    const d = new Date(year, month, day);
    return (start && sameDay(d, start)) || (end && sameDay(d, end));
  };
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
    <div className="bg-yellow flex h-[33.625rem] w-[42.1875rem] flex-col px-10 pb-8 pt-6">
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

      <div className="en-title-sm text-black mt-6 grid grid-cols-7 text-center">
        {WEEKDAYS.map((w, i) => (
          <span key={i} className="py-2">
            {w}
          </span>
        ))}
      </div>

      <div className="en-title-sm mt-1 grid grid-cols-7 text-center">
        {cells.map((day, i) =>
          day === null ? (
            <span key={i} />
          ) : (
            <button
              key={i}
              type="button"
              onClick={() => pick(day)}
              disabled={isDisabled(day)}
              className={`flex h-11 items-center justify-center ${
                isEdge(day)
                  ? "bg-charcoal text-white"
                  : isBetween(day)
                    ? "bg-green text-black"
                    : isDisabled(day)
                      ? "text-gray4"
                      : "text-black"
              }`}
            >
              {day}
            </button>
          )
        )}
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
