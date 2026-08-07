import { useNavigate } from "react-router-dom";

import arrowsOutIcon from "@/assets/icon/arrows-out.svg";
import layout11Icon from "@/assets/icon/layout-1-1.svg";
import layout22Icon from "@/assets/icon/layout-2-2.svg";
import layout33Icon from "@/assets/icon/layout-3-3.svg";
import Pagination from "@/components/common/Pagination";

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

  return (
    <div className="flex items-center justify-between py-1">
      <div className="flex items-center gap-[5px] w-[9.375rem]">
        <LayoutToggleBtn icon={layout11Icon} label="1열 보기" active={cols === 1} onClick={() => onColsChange(1)} />
        <LayoutToggleBtn icon={layout22Icon} label="2열 보기" active={cols === 2} onClick={() => onColsChange(2)} />
        <LayoutToggleBtn icon={layout33Icon} label="3열 보기" active={cols === 3} onClick={() => onColsChange(3)} />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

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
