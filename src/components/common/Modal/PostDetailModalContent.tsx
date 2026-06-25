import logo from "@/assets/img/logo.svg";
import closeIcon from "@/assets/icon/close-1.svg";
import downloadIcon from "@/assets/icon/download.svg";
import editIcon from "@/assets/icon/edit.svg";
import trashIcon from "@/assets/icon/waste-basket.svg";
import type { MakeItPost } from "@/types/makeIt";

interface PostDetailModalContentProps {
  onClose: () => void;
  post: MakeItPost;
  isMine?: boolean;
  onDownload?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

// 문장 길이에 따라 폰트/줄높이 단계 조정 (짧을수록 큼)
function getTextSize(length: number) {
  if (length <= 120) return { fontSize: "1.5rem", lineHeight: "2.5rem" };
  if (length <= 220) return { fontSize: "1.375rem", lineHeight: "2.25rem" };
  return { fontSize: "1.25rem", lineHeight: "2rem" };
}

function PostDetailModalContent({
  onClose,
  post,
  isMine,
  onDownload,
  onEdit,
  onDelete,
}: PostDetailModalContentProps) {
  const { fontSize, lineHeight } = getTextSize(post.content.length);

  return (
    <div className="bg-lightyellow flex h-[29.5625rem] w-[36.25rem] flex-col">
      <div className="flex justify-end px-6 pt-5 pb-3">
        <button onClick={onClose} aria-label="닫기">
          <img src={closeIcon} alt="" className="size-7" />
        </button>
      </div>

      {/* 罫線(줄) 배경 위 본문 */}
      <div
        className="flex-1 overflow-y-auto border-y border-black/15 px-6"
        style={{
          backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent calc(${lineHeight} - 1px), rgba(0,0,0,0.12) calc(${lineHeight} - 1px), rgba(0,0,0,0.12) ${lineHeight})`,
        }}
      >
        <p className="text-black" style={{ fontSize, lineHeight }}>
          {post.content}
        </p>
      </div>

      <div className="px-6 pt-4 pb-5">
        <p className="en-title-sm text-gray2 text-right">{post.date}</p>
        <div className="mt-4 flex items-end justify-between">
          <img src={logo} alt="NTC" className="h-6" />
          <div className="flex items-center gap-4">
            <button onClick={onDownload} aria-label="다운로드">
              <img src={downloadIcon} alt="" className="size-6" />
            </button>
            {isMine && (
              <button onClick={onEdit} aria-label="수정">
                <img src={editIcon} alt="" className="size-6" />
              </button>
            )}
            {isMine && (
              <button onClick={onDelete} aria-label="삭제">
                <img src={trashIcon} alt="" className="size-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailModalContent;
