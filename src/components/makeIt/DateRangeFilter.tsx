import directionDownIcon from "@/assets/icon/direction-down.svg";
import searchIcon from "@/assets/icon/search.svg";

interface DateRangeFilterProps {
  fromDate: string;
  toDate: string;
  search: string;
  onSearchChange: (v: string) => void;
}

export default function DateRangeFilter({
  fromDate,
  toDate,
  search,
  onSearchChange,
}: DateRangeFilterProps) {
  return (
    <div className="flex w-[325px] flex-col justify-between gap-[13px] pt-[8px]">
      <div className="flex items-center justify-between gap-[10px]">
        <div className="en-title-sm flex items-center gap-[5px] capitalize">
          <span className="text-gray3">From</span>
          <span className="text-black">{fromDate}</span>
        </div>
        <div className="en-title-sm flex items-center gap-[5px] capitalize">
          <span className="text-gray3">To</span>
          <span className="text-black">{toDate}</span>
        </div>
        <img src={directionDownIcon} alt="" className="size-[22px]" />
      </div>
      <div className="flex flex-row items-end">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border-gray4 en-caption-1 w-full border-b bg-transparent pb-2 text-black outline-none"
        />
        <button
          type="button"
          aria-label="검색"
          className="border-gray4 border-b"
        >
          <img src={searchIcon} alt="" className="size-8" />
        </button>
      </div>
    </div>
  );
}
