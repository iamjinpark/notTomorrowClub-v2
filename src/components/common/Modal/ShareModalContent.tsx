import { useState } from "react";
import BorderBtn from "../BorderBtn";

interface ShareModalContentProps {
  onClose: () => void;
  onSave?: (share: boolean) => void;
}

function ShareModalContent({ onClose, onSave }: ShareModalContentProps) {
  const [share, setShare] = useState(false);

  return (
    <div className="bg-lightyellow flex w-[34.5rem] flex-col items-center gap-[2.5rem] px-10 py-[3.75rem] text-center">
      <p className="en-title-md text-black">
        Do you want to share your sentence?
      </p>

      {/* Keep / Share 토글 */}
      <div className="en-title-sm flex items-center gap-[0.875rem]">
        <span className={share ? "text-gray3" : "text-black"}>Keep</span>
        <button
          type="button"
          role="switch"
          aria-checked={share}
          onClick={() => setShare((s) => !s)}
          className="bg-charcoal relative h-[2rem] w-[3.75rem] rounded-full"
        >
          <span
            className={`absolute top-1 size-[1.5rem] rounded-full bg-white transition-all ${
              share ? "left-[2rem]" : "left-1"
            }`}
          />
        </button>
        <span className={share ? "text-black" : "text-gray3"}>Share</span>
      </div>

      <div className="flex gap-[0.875rem]">
        <BorderBtn
          text="Cancel"
          bg="bg-white"
          px="px-[1.625rem]"
          py="py-[0.625rem]"
          onClick={onClose}
        />
        <BorderBtn
          text="Save"
          bg="bg-charcoal text-white hover:bg-charcoal"
          px="px-[1.625rem]"
          py="py-[0.625rem]"
          onClick={() => {
            onSave?.(share);
            onClose();
          }}
        />
      </div>
    </div>
  );
}

export default ShareModalContent;
