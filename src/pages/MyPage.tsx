import { useNavigate } from "react-router-dom";

import ProfileSection from "@/components/myPage/ProfileSection";
import RecentMakeIt from "@/components/myPage/RecentMakeIt";
import StatsChart from "@/components/myPage/StatsChart";
import { MY_PAGE_RECENT, MY_PAGE_STATS, MY_PAGE_USER } from "@/api/dummyData";

export default function MyPage() {
  const navigate = useNavigate();

  // TODO: 서버 연동 후 mock 데이터를 실제 응답으로 교체
  const user = MY_PAGE_USER;
  const recent = MY_PAGE_RECENT;
  const stats = MY_PAGE_STATS;

  return (
    <div className="flex flex-col border-y border-black lg:min-h-[530px] lg:flex-row">
      <ProfileSection
        user={user}
        onCheckCard={() => navigate("/mypage/card")}
      />
      <section className="flex min-w-0 flex-1 flex-col">
        <RecentMakeIt post={recent} />
        <StatsChart stats={stats} />
      </section>
    </div>
  );
}
