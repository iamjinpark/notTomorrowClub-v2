import { forwardRef } from "react";

const BorderBtn = forwardRef(function BorderBtn(
  { text, px, py, bg = "bg-transparent", onClick, className = "" },
  ref
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
});

export default BorderBtn;
