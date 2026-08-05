import viewIcon from "@/assets/icon/view-1.svg";
import likeIcon from "@/assets/icon/like-empty.svg";
import arrowRightIcon from "@/assets/icon/direction-right.svg";
import type { RecentMakeItPost } from "@/types/myPage";

interface RecentMakeItProps {
  post: RecentMakeItPost;
  onOpenDetail?: () => void;
}

export default function RecentMakeIt({
  post,
  onOpenDetail,
}: RecentMakeItProps) {
  return (
    <div className="border-b border-black py-[1.875rem] lg:py-5 lg:pl-4">
      <p className="ko-headline-sm text-gray3">Recent | Make it</p>
      <div className="mt-2 flex items-start gap-[1.25rem]">
        {/* min-h가 있어야 아래 mt-auto가 999/+more를 하단으로 밀어낸다 (시안 기준 196px) */}
        <div className="flex min-w-0 flex-1 flex-col gap-[1.25rem] lg:min-h-[12.25rem] lg:flex-row lg:gap-[1.875rem]">
          <div className="flex min-w-0 flex-col lg:w-[13rem] lg:shrink-0">
            <p className="en-title-lg text-gray3">{post.date}</p>
            <p className="en-headline-sm mt-1 leading-tight text-black">
              {post.title}
            </p>
            <div className="mt-4 flex items-center gap-[1.875rem] lg:mt-auto">
              <span className="en-caption-1 text-gray2 flex items-center gap-[0.375rem]">
                <img src={viewIcon} alt="views" className="size-7" />
                {post.views}
              </span>
              <span className="en-caption-1 text-gray2 flex items-center gap-[0.375rem]">
                <img src={likeIcon} alt="likes" className="size-7" />
                {post.likes}
              </span>
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <p className="en-body-md line-clamp-5 break-words whitespace-pre-line text-black">
              {post.body}
            </p>
            <span className="bg-gray6 ko-caption-1 text-gray3 mt-3 self-start rounded-full px-[0.875rem] py-1 lg:mt-auto">
              +more
            </span>
          </div>
        </div>
        <button
          type="button"
          aria-label="최근 문장 상세보기"
          className="shrink-0 self-center"
          onClick={onOpenDetail}
        >
          <img src={arrowRightIcon} alt="" className="size-9" />
        </button>
      </div>
    </div>
  );
}
