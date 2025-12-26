export default function Step2({ onNext, onPrev }) {
  return (
    <div>
      <h2>Step 2</h2>

      {/* step별 입력/검증 영역 */}

      <button onClick={onPrev}>이전</button>
      <button onClick={onNext}>다음</button>
    </div>
  );
}
