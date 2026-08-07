import directionLeftIcon from "@/assets/icon/direction-left.svg";
import directionRightIcon from "@/assets/icon/direction-right.svg";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex items-center gap-6">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="size-[22px] flex items-center justify-center disabled:opacity-30"
        aria-label="이전 페이지"
      >
        <img src={directionLeftIcon} alt="" className="size-[22px]" />
      </button>
      <div className="flex items-center gap-6 en-title-sm not-italic capitalize">
        {pageNumbers.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="text-gray4">
              ...
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p as number)}
              className={p === currentPage ? "text-black" : "text-gray4"}
            >
              {p}
            </button>
          ),
        )}
      </div>
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="size-[22px] flex items-center justify-center disabled:opacity-30"
        aria-label="다음 페이지"
      >
        <img src={directionRightIcon} alt="" className="size-[22px]" />
      </button>
    </div>
  );
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, "...", total];
  if (current >= total - 2) return [1, "...", total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}
