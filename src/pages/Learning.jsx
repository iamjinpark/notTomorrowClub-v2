import FunnelContainer from "@/components/learning/FunnelContainer";
import LoginRequiredOverlay from "@/components/learning/LoginRequiredOverlay";
import { useState } from "react";

function Learning() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleScrollProgress = (progress) => {
    setScrollProgress(progress);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // 로그인하지 않았고 스크롤 진행률이 0.3 이상일 때 오버레이 표시
  const showOverlay = !isLoggedIn && scrollProgress > 0.3;

  return (
    <div className="relative">
      <FunnelContainer
        onScrollProgress={handleScrollProgress}
        isLoggedIn={isLoggedIn}
      />
      {showOverlay && <LoginRequiredOverlay onLogin={handleLogin} />}
    </div>
  );
}

export default Learning;
