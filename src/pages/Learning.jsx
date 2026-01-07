import FunnelContainer from "@/components/learning/FunnelContainer";
import LoginRequiredOverlay from "@/components/learning/LoginRequiredOverlay";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Learning() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // TODO : 로그인 로직 구현 후 false로 변경

  const navigate = useNavigate();

  const handleScrollProgress = (progress) => {
    setScrollProgress(progress);
  };

  const goLogin = () => {
    navigate("/login");
  };

  // 로그인하지 않았고 스크롤 진행률이 0.3 이상일 때 오버레이 표시
  const showOverlay = !isLoggedIn && scrollProgress > 0.3;

  return (
    <div className="relative">
      <FunnelContainer
        onScrollProgress={handleScrollProgress}
        isLoggedIn={isLoggedIn}
      />
      {showOverlay && <LoginRequiredOverlay goLogin={goLogin} />}
    </div>
  );
}

export default Learning;
