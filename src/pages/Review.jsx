import ReviewFunnelContainer from "@/components/review/ReviewFunnelContainer";
import { useLearningData } from "@/context/LearningDataContext";

function Review() {
  const reviewData = useLearningData();

  return (
    <div className="relative">
      <ReviewFunnelContainer learningData={reviewData} />
    </div>
  );
}

export default Review;
