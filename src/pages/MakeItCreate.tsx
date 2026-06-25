import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { STEP_DATA } from "@/api/dummyData";
import BorderBtn from "@/components/common/BorderBtn";
import Modal from "@/components/common/Modal/Modal";
import PageHeader from "@/layouts/PageHeader";
import { useModal } from "@/hooks/useModal";
import directionDownIcon from "@/assets/icon/direction-down.svg";

const TEXT_LIMIT = 500;

export default function MakeItCreate() {
  const navigate = useNavigate();
  const sentences = STEP_DATA;

  const [open, setOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [text, setText] = useState("");
  const shareModal = useModal();

  const selected = selectedIdx !== null ? sentences[selectedIdx] : null;

  const handleSave = (share: boolean) => {
    // TODO: 실제 저장 API 연동 후 응답 처리 (share: 공유 여부)
    void share;
    navigate("/make-it");
  };

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Let's make your sentence!"
        subtitle="배웠던 문장을 생각해보며 나만의 문장을 만들어보세요"
      />

      <div className="mt-[26px] flex flex-col border-t border-black">
        {/* 입력 카드 */}
        <div className="relative flex min-h-[27.5rem] flex-col">
          {/* 드롭다운 헤더 */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="bg-gray6 en-title-md text-gray3 relative flex h-[3.75rem] shrink-0 items-center justify-center"
          >
            {selected ? selected.en : "Select Today's Sentence"}
            <img
              src={directionDownIcon}
              alt=""
              className={`absolute right-4 size-[22px] transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>

          {/* 본문: 작성 textarea */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, TEXT_LIMIT))}
            maxLength={TEXT_LIMIT}
            placeholder={`Add your idea and make it yours! Writing here!\n(Text Limit: ${TEXT_LIMIT})`}
            className="en-body-md placeholder:text-gray4 flex-1 resize-none bg-transparent pt-[0.875rem] text-black outline-none"
          />

          {/* 선택 시 단어 힌트 */}
          {selected && (
            <div className="ko-caption-1 text-gray3 flex shrink-0 flex-wrap gap-x-[2.5rem] gap-y-1 border-t border-dashed border-gray4 pt-[0.875rem]">
              {selected.words.map((w, i) => (
                <span key={i}>
                  * {w.en}: {w.ko}
                </span>
              ))}
            </div>
          )}

          {/* 열렸을 때 옵션 목록 (textarea 위에 겹침) */}
          {open && (
            <ul className="absolute inset-x-0 top-[3.75rem] z-10 bg-gray5">
              {sentences.map((s, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedIdx(i);
                      setOpen(false);
                    }}
                    className={`en-body-lg block w-full px-4 py-[0.5rem] text-center transition-colors hover:bg-yellow ${
                      i === selectedIdx ? "bg-yellow text-black" : "text-gray3"
                    }`}
                  >
                    {s.en}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 액션 버튼 */}
        <div className="flex justify-center gap-[0.875rem] pt-[1.875rem]">
          <BorderBtn
            text="Cancel"
            px="px-[1.625rem]"
            py="py-[0.625rem]"
            onClick={() => navigate(-1)}
          />
          <BorderBtn
            text="Save"
            px="px-[1.625rem]"
            py="py-[0.625rem]"
            onClick={shareModal.open}
          />
        </div>
      </div>

      <div className="mt-[1.875rem] border-b border-black" />

      <Modal
        type="share"
        isOpen={shareModal.isOpen}
        onClose={shareModal.close}
        onSave={handleSave}
      />
    </div>
  );
}
