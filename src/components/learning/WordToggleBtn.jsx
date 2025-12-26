export default function WorldToggleBtn({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`
        relative w-[74px] h-[36px] rounded-full
        border bordr-black
        transition-colors duration-200 ease-in-out
        ${checked ? "bg-black" : "bg-white"}
      `}
      aria-pressed={checked}
    >
      <span
        className={`
          absolute top-[3px] left-[4px]
          w-[28px] h-[28px] rounded-full
          bg-black 
          transition-transform duration-200 ease-in-out
          ${
            checked
              ? "translate-x-[36px] bg-lightyellow"
              : "translate-x-0 bg-black"
          }
        `}
      />
    </button>
  );
}
