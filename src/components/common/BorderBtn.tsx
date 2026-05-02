import { forwardRef } from "react";

interface BorderBtnProps {
  text: string;
  px?: string;
  py?: string;
  bg?: string;
  onClick?: () => void;
  className?: string;
}

const BorderBtn = forwardRef<HTMLButtonElement, BorderBtnProps>(
  function BorderBtn(
    { text, px, py, bg = "bg-transparent", onClick, className = "" },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={`
        ${px} ${py} ${bg}
        border-[0.8px] rounded-full
        hover:bg-lightyellow
        transition-colors
        disabled:bg-black disabled:text-white disabled:cursor-not-allowed
        ${className}
      `}
      >
        {text}
      </button>
    );
  },
);

export default BorderBtn;
