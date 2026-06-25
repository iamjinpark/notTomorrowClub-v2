import { useNavigate } from "react-router-dom";

import arrowsOutIcon from "@/assets/icon/arrows-out.svg";
import directionLeftIcon from "@/assets/icon/direction-left.svg";
import directionRightIcon from "@/assets/icon/direction-right.svg";
import layout11Icon from "@/assets/icon/layout-1-1.svg";
import layout22Icon from "@/assets/icon/layout-2-2.svg";
import layout33Icon from "@/assets/icon/layout-3-3.svg";

type Cols = 1 | 2 | 3;

interface PostListControlsProps {
  cols: Cols;
  onColsChange: (cols: Cols) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PostListControls({
  cols,
  onColsChange,
  currentPage,
  totalPages,
  onPageChange,
}: PostListControlsProps) {
  const navigate = useNavigate();
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex items-center justify-between py-1">
      <div className="flex items-center gap-[5px] w-[9.375rem]">
        <LayoutToggleBtn icon={layout11Icon} label="1열 보기" active={cols === 1} onClick={() => onColsChange(1)} />
        <LayoutToggleBtn icon={layout22Icon} label="2열 보기" active={cols === 2} onClick={() => onColsChange(2)} />
        <LayoutToggleBtn icon={layout33Icon} label="3열 보기" active={cols === 3} onClick={() => onColsChange(3)} />
      </div>

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

      <div className="flex items-center gap-1 justify-end w-[9.375rem]">
        <button
          type="button"
          onClick={() => navigate("/make-it/create")}
          className="flex items-center gap-1"
        >
          <span className="en-title-sm not-italic capitalize text-black">
            Go to Make It
          </span>
          <img src={arrowsOutIcon} alt="" className="size-[22px]" />
        </button>
      </div>
    </div>
  );
}

function LayoutToggleBtn({
  icon,
  label,
  active,
  onClick,
}: {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`size-[22px] transition-opacity ${active ? "opacity-100" : "opacity-30"}`}
    >
      <img src={icon} alt="" className="size-full" />
    </button>
  );
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, "...", total];
  if (current >= total - 2) return [1, "...", total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}
