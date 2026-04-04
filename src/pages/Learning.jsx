import LearningFunnelContainer from "@/components/learning/LearningFunnelContainer";
import LoginRequiredOverlay from "@/components/learning/LoginRequiredOverlay";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLearningData } from "@/context/LearningDataContext";
import { SCROLL_REVEAL_THRESHOLD } from "@/constants";

function Learning() {
  const navigate = useNavigate();
  const learningData = useLearningData();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // TODO : 로그인 로직 구현 후 false로 변경

  const handleScrollProgress = (progress) => {
    setScrollProgress(progress);
  };

  const goLogin = () => {
    navigate("/login");
  };

  // 로그인하지 않았고 스크롤 진행률이 임계값 이상일 때 오버레이 표시
  const showOverlay = !isLoggedIn && scrollProgress > SCROLL_REVEAL_THRESHOLD;

  return (
    <div className="relative">
      <LearningFunnelContainer
        onScrollProgress={handleScrollProgress}
        isLoggedIn={isLoggedIn}
        learningData={learningData}
      />
      {showOverlay && <LoginRequiredOverlay goLogin={goLogin} />}
    </div>
  );
}

export default Learning;
