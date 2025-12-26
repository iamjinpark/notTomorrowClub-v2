function StepIndicator({ step }) {
  const X = [9, 83, 157, 239, 315];

  return (
    <svg
      width="324"
      height="18"
      viewBox="0 0 324 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`step ${step}`}
    >
      <path d="M9 8.71094L323.5 8.71094" stroke="#404040" strokeWidth="0.8" />

      {X.map((cx, index) => {
        const current = index + 1 <= step;

        return (
          <g key={cx}>
            <circle
              cx={cx}
              cy="9"
              r="9"
              fill={current ? "#2B2B2B" : "#D9D9D9"}
            />
            <circle
              cx={cx}
              cy="9"
              r="4"
              fill={current ? "#F3FF60" : "#8C8C8C"}
            />
          </g>
        );
      })}
    </svg>
  );
}

export default StepIndicator;
