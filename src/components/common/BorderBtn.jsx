function BorderBtn({ text, px, py, bg = "bg-transparent", onClick }) {
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
      `}
    >
      {text}
    </button>
  );
}

export default BorderBtn;
