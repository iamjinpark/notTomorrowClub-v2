import ProfileSummary from "./ProfileSummary";
import ProfileActions from "./ProfileActions";
import NtcCard from "./NtcCard";
import type { MyPageUser } from "@/types/myPage";

interface ProfileSectionProps {
  user: MyPageUser;
  onEditName?: () => void;
  onOpenBadge?: () => void;
  onCheckCard?: () => void;
  onExit?: () => void;
}

export default function ProfileSection({
  user,
  onEditName,
  onOpenBadge,
  onCheckCard,
  onExit,
}: ProfileSectionProps) {
  return (
    <section className="flex w-full flex-col gap-[1.25rem] border-b border-black py-[1.875rem] lg:w-[35%] lg:min-w-[19rem] lg:shrink-0 lg:border-r lg:border-b-0 lg:py-5 lg:pr-4">
      <ProfileSummary user={user} />
      <ProfileActions
        onEditName={onEditName}
        onOpenBadge={onOpenBadge}
        onCheckCard={onCheckCard}
      />
      <NtcCard issuedYear={user.issuedYear} onExit={onExit} />
    </section>
  );
}
