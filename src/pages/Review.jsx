import FunnelContainer from "@/components/learning/FunnelContainer";

import { useState, useEffect } from "react";
import { fetchLearningData } from "@/api/learning"; // 같은 API 재사용 또는 별도 API

function Review() {
  const [reviewData, setReviewData] = useState([]);

  // 리뷰 데이터 불러오기
  useEffect(() => {
    const loadReviewData = async () => {
      try {
        const data = await fetchLearningData();
        setReviewData(data);
      } catch (error) {
        console.error("Failed to load review data:", error);
      }
    };

    loadReviewData();
  }, []);

  return (
    <div className="relative">
      <FunnelContainer type="review" learningData={reviewData} />
    </div>
  );
}

export default Review;
