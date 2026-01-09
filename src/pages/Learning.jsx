import FunnelContainer from "@/components/learning/FunnelContainer";
import LoginRequiredOverlay from "@/components/learning/LoginRequiredOverlay";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLearningData } from "@/api/learning";

function Learning() {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // TODO : 로그인 로직 구현 후 false로 변경
  const [learningData, setLearningData] = useState([]);

  // 학습 데이터 불러오기
  useEffect(() => {
    const loadLearningData = async () => {
      try {
        const data = await fetchLearningData();
        setLearningData(data);
      } catch (error) {
        console.error("Failed to load learning data:", error);
      }
    };

    loadLearningData();
  }, []);

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
        type="learning"
        onScrollProgress={handleScrollProgress}
        isLoggedIn={isLoggedIn}
        learningData={learningData}
      />
      {showOverlay && <LoginRequiredOverlay goLogin={goLogin} />}
    </div>
  );
}

export default Learning;
