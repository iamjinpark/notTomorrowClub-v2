import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProfileSection from "@/components/myPage/ProfileSection";
import RecentMakeIt from "@/components/myPage/RecentMakeIt";
import StatsChart from "@/components/myPage/StatsChart";
import Modal from "@/components/common/Modal/Modal";
import { useModal } from "@/hooks/useModal";
import { MY_PAGE_RECENT, MY_PAGE_STATS, MY_PAGE_USER } from "@/api/dummyData";
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
  const recent = MY_PAGE_RECENT;
  const stats = MY_PAGE_STATS;

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
        <RecentMakeIt post={recent} />
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
