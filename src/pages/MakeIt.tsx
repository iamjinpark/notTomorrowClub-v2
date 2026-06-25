import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MAKE_IT_POSTS } from "@/api/dummyData";
import DateRangeFilter from "@/components/makeIt/DateRangeFilter";
import PostCard from "@/components/makeIt/PostCard";
import PostListControls from "@/components/makeIt/PostListControls";
import LoginRequiredOverlay from "@/components/learning/LoginRequiredOverlay";
import Modal from "@/components/common/Modal/Modal";
import PageHeader from "@/layouts/PageHeader";
import { useModal } from "@/hooks/useModal";
import type { MakeItPost } from "@/types/makeIt";

type Cols = 1 | 2 | 3;

const POSTS_PER_LAYOUT: Record<Cols, number> = { 1: 2, 2: 4, 3: 6 };
const CURRENT_USER = "Ezi Park"; // TODO: 로그인 사용자로 교체

export default function MakeIt() {
  const navigate = useNavigate();
  const [isLoggedIn] = useState(true); // TODO : 로그인 로직 구현 후 false로 변경
  const [cols, setCols] = useState<Cols>(2);

  // 비로그인 시 스크롤 잠금 — 오버레이가 footer까지 덮지 않도록 (Modal과 동일 패턴)
  useEffect(() => {
    if (isLoggedIn) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoggedIn]);

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const detailModal = useModal();
  const [selectedPost, setSelectedPost] = useState<MakeItPost | null>(null);

  const openDetail = (post: MakeItPost) => {
    setSelectedPost(post);
    detailModal.open();
  };

  const filteredPosts = useMemo(() => {
    if (!search.trim()) return MAKE_IT_POSTS;
    const q = search.toLowerCase();
    return MAKE_IT_POSTS.filter((p) => p.content.toLowerCase().includes(q));
  }, [search]);

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
      <PageHeader
        title="See how others used Today's sentence"
        subtitle="오늘의 문장, 다들 이렇게 썼어요. 이제 당신 차례예요"
      >
        <DateRangeFilter
          fromDate="2025/07/20"
          toDate="2025/11/21"
          search={search}
          onSearchChange={handleSearchChange}
        />
      </PageHeader>

      <div
        className="bg-gray5 border-gray5 grid gap-px border"
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

      {!isLoggedIn && (
        <LoginRequiredOverlay goLogin={() => navigate("/login")} />
      )}

      {selectedPost && (
        <Modal
          type="postDetail"
          isOpen={detailModal.isOpen}
          onClose={detailModal.close}
          post={selectedPost}
          isMine={selectedPost.author === CURRENT_USER}
        />
      )}
    </div>
  );
}
