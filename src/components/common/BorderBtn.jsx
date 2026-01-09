function BorderBtn({
  text,
  px,
  py,
  bg = "bg-transparent",
  onClick,
  className = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        ${px} ${py} ${bg}
        border rounded-full
        hover:bg-lightyellow
        transition-colors
        disabled:bg-black disabled:text-white disabled:cursor-not-allowed
        ${className}
      `}
    >
      {text}
    </button>
  );
}

export default BorderBtn;
