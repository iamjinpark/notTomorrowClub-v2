import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProfileSection from "@/components/myPage/ProfileSection";
import RecentMakeIt from "@/components/myPage/RecentMakeIt";
import StatsChart from "@/components/myPage/StatsChart";
import Modal from "@/components/common/Modal/Modal";
import { useModal } from "@/hooks/useModal";
import { MY_PAGE_RECENTS, MY_PAGE_STATS, MY_PAGE_USER } from "@/api/dummyData";
import type { MoodId, StudyDataStandard } from "@/types/myPage";

// TODO: 서버 연동 후 실제 응답으로 교체
const DEFAULT_STANDARD: StudyDataStandard = {
  timeStudied: 300,
  timesWritten: 100,
  daysAttended: 100,
};

export default function MyPage() {
  const navigate = useNavigate();

  const user = MY_PAGE_USER;
  const stats = MY_PAGE_STATS;

  const [recentIndex, setRecentIndex] = useState(0);
  const recent = MY_PAGE_RECENTS[recentIndex];

  const exitModal = useModal();
  const standardModal = useModal();
  const moodModal = useModal();

  const [standard, setStandard] = useState(DEFAULT_STANDARD);
  const [moodId, setMoodId] = useState<MoodId>();

  return (
    <div className="flex flex-col border-y border-black lg:min-h-[530px] lg:flex-row">
      <ProfileSection
        user={user}
        moodId={moodId}
        onPickMood={moodModal.open}
        onCheckCard={() => navigate("/mypage/card")}
        onExit={exitModal.open}
      />
      <section className="flex min-w-0 flex-1 flex-col">
        {recent && (
          <RecentMakeIt
            post={recent}
            // 이전 버튼이 없으므로 마지막에서 첫 글로 순환한다
            onNext={() =>
              setRecentIndex((i) => (i + 1) % MY_PAGE_RECENTS.length)
            }
            onOpenArchive={() => navigate("/mypage/sentences")}
          />
        )}
        <StatsChart
          stats={stats}
          standard={standard}
          onOpenSettings={standardModal.open}
        />
      </section>

      <Modal
        type="ntcExit"
        isOpen={exitModal.isOpen}
        onClose={exitModal.close}
        // TODO: 탈퇴 API 연동
      />
      <Modal
        type="studyStandard"
        isOpen={standardModal.isOpen}
        onClose={standardModal.close}
        standard={standard}
        onSave={setStandard}
      />
      <Modal
        type="moodPicker"
        isOpen={moodModal.isOpen}
        onClose={moodModal.close}
        moodId={moodId}
        onSave={setMoodId}
      />
    </div>
  );
}
