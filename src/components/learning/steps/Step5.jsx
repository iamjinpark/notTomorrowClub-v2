export default function Step5({ onNext, onPrev }) {
  return (
    <div>
      <h2>Step 5</h2>

      {/* step별 입력/검증 영역 */}

      <button onClick={onPrev}>이전</button>
      <button onClick={onNext}>다음</button>
    </div>
  );
}
