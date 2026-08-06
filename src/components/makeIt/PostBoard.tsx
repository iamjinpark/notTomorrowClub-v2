import { useMemo, useState } from "react";

import PostFilterBar from "@/components/makeIt/PostFilterBar";
import PostCard from "@/components/makeIt/PostCard";
import PostListControls from "@/components/makeIt/PostListControls";
import Modal from "@/components/common/Modal/Modal";
import PageHeader from "@/layouts/PageHeader";
import { useModal } from "@/hooks/useModal";
import type { MakeItPost } from "@/types/makeIt";

type Cols = 1 | 2 | 3;

const POSTS_PER_LAYOUT: Record<Cols, number> = { 1: 2, 2: 4, 3: 6 };
const CURRENT_USER = "Ezi Park"; // TODO: 로그인 사용자로 교체

interface PostBoardProps {
  title: string;
  subtitle: string;
  posts: MakeItPost[];
}

export default function PostBoard({ title, subtitle, posts }: PostBoardProps) {
  const [cols, setCols] = useState<Cols>(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const detailModal = useModal();
  const [selectedPost, setSelectedPost] = useState<MakeItPost | null>(null);

  const openDetail = (post: MakeItPost) => {
    setSelectedPost(post);
    detailModal.open();
  };

  const calendarModal = useModal();
  const [fromDate, setFromDate] = useState("2025/07/20");
  const [toDate, setToDate] = useState("2025/11/21");

  const handleApplyRange = (from: Date, to: Date) => {
    const fmt = (d: Date) =>
      `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
    setFromDate(fmt(from));
    setToDate(fmt(to));
    calendarModal.close();
    // TODO: 선택한 날짜 범위로 게시글 필터링 연동
  };

  const filteredPosts = useMemo(() => {
    if (!search.trim()) return posts;
    const q = search.toLowerCase();
    return posts.filter((p) => p.content.toLowerCase().includes(q));
  }, [posts, search]);

  const postsPerPage = POSTS_PER_LAYOUT[cols];
  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / postsPerPage)
  );
  const safePage = Math.min(currentPage, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (safePage - 1) * postsPerPage,
    safePage * postsPerPage
  );

  const handleSearchChange = (v: string) => {
    setSearch(v);
    setCurrentPage(1);
  };

  const handleColsChange = (c: Cols) => {
    setCols(c);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-[26px]">
      <PageHeader title={title} subtitle={subtitle}>
        <PostFilterBar
          fromDate={fromDate}
          toDate={toDate}
          search={search}
          onSearchChange={handleSearchChange}
          onOpenCalendar={calendarModal.open}
        />
      </PageHeader>

      <div
        className="bg-gray5 border-gray5 grid gap-px border-y"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {paginatedPosts.map((post) => (
          <PostCard key={post.id} post={post} onClick={openDetail} />
        ))}
      </div>

      <PostListControls
        cols={cols}
        onColsChange={handleColsChange}
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {selectedPost && (
        <Modal
          type="postDetail"
          isOpen={detailModal.isOpen}
          onClose={detailModal.close}
          post={selectedPost}
          isMine={selectedPost.author === CURRENT_USER}
        />
      )}

      <Modal
        type="dateRange"
        isOpen={calendarModal.isOpen}
        onClose={calendarModal.close}
        onApply={handleApplyRange}
      />
    </div>
  );
}
