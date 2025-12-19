function BorderBtn({ text, px, py, bg = "bg-transparent", onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        ${px} ${py} ${bg}
        border rounded-full
        hover:bg-charcoal hover:text-white
        transition-colors
      `}
    >
      {text}
    </button>
  );
}

export default BorderBtn;
