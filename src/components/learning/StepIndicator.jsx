export default function StepIndicator({ step, onStepChange }) {
  const X = [10, 84, 158, 232, 306];

  return (
    <div className="mt-[0.563rem]">
      <svg
        width="316"
        height="20"
        viewBox="0 0 316 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={`step ${step}`}
      >
        {/* 배경 라인 */}
        <path d="M10 10H306" stroke="#D9D9D9" strokeWidth="0.8" />
        {/* 진행도 라인 */}
        {step > 1 && (
          <path
            d={`M10 10H${X[step - 1]}`}
            stroke="#2B2B2B"
            strokeWidth="2.5"
          />
        )}
        {X.map((cx, index) => {
          const stepNumber = index + 1;
          const completed = stepNumber <= step;
          const clickable = stepNumber < step;
          const isActive = stepNumber === step;

          return (
            <g
              key={cx}
              role="button"
              aria-label={`Go to step ${stepNumber}`}
              aria-current={step === stepNumber ? "step" : undefined}
              onClick={clickable ? () => onStepChange(stepNumber) : undefined}
              style={{
                cursor: clickable ? "pointer" : "not-allowed",
                pointerEvents: clickable ? "auto" : "none",
              }}
            >
              <circle
                cx={cx}
                cy="10"
                r="10"
                fill={completed ? "#2B2B2B" : "#D9D9D9"}
              />
              <circle
                cx={cx}
                cy="10"
                r="5"
                fill={completed ? "#F3FF60" : "#8C8C8C"}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
