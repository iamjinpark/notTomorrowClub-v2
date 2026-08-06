import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MAKE_IT_POSTS } from "@/api/dummyData";
import PostBoard from "@/components/makeIt/PostBoard";
import LoginRequiredOverlay from "@/components/learning/LoginRequiredOverlay";

export default function MakeIt() {
  const navigate = useNavigate();
  const [isLoggedIn] = useState(true); // TODO : 로그인 로직 구현 후 false로 변경

  // 비로그인 시 스크롤 잠금 — 오버레이가 footer까지 덮지 않도록 (Modal과 동일 패턴)
  useEffect(() => {
    if (isLoggedIn) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoggedIn]);

  return (
    <>
      <PostBoard
        title="See how others used Today's sentence"
        subtitle="오늘의 문장, 다들 이렇게 썼어요. 이제 당신 차례예요"
        posts={MAKE_IT_POSTS}
      />

      {!isLoggedIn && (
        <LoginRequiredOverlay goLogin={() => navigate("/login")} />
      )}
    </>
  );
}
