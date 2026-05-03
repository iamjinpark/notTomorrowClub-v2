import likeEmptyIcon from "@/assets/icon/like-empty.svg";
import type { MakeItPost } from "@/types/makeIt";

interface PostCardProps {
  post: MakeItPost;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="flex flex-col justify-between bg-white px-3 pt-[0.9375rem] pb-3 min-h-[12.3125rem]">
      <p className="en-body-md text-black line-clamp-4 flex-1 min-h-0">
        {post.content}
      </p>
      <div className="flex items-end justify-between shrink-0">
        <button type="button" className="flex items-center gap-[3px]" aria-label="좋아요">
          <img src={likeEmptyIcon} alt="" className="size-8" />
          <span className="en-caption-1 text-gray2 w-5 text-left">{post.likes}</span>
        </button>
        <div className="flex gap-[0.9375rem] en-caption-1 text-gray3">
          <span>{post.date}</span>
          <span className="whitespace-nowrap">{post.author}</span>
        </div>
      </div>
    </div>
  );
}
