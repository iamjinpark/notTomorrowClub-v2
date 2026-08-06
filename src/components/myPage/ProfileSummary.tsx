import plusIcon from "@/assets/icon/plus.svg";
import { findMood } from "@/constants/mood";
import type { MoodId, MyPageUser } from "@/types/myPage";

interface ProfileSummaryProps {
  user: MyPageUser;
  moodId?: MoodId;
  onPickMood?: () => void;
}

export default function ProfileSummary({
  user,
  moodId,
  onPickMood,
}: ProfileSummaryProps) {
  const mood = findMood(moodId);

  return (
    <div>
      <p className="ko-headline-sm text-gray3">User Name</p>
      <div className="mt-[0.875rem] flex items-start gap-[1.25rem]">
        <button
          type="button"
          onClick={onPickMood}
          aria-label={
            mood ? `오늘의 기분: ${mood.label}. 변경` : "오늘의 기분 선택"
          }
          className="bg-gray6 flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-md"
        >
          {mood ? (
            <img src={mood.icon} alt="" className="size-full" />
          ) : (
            <img src={plusIcon} alt="" className="size-6 opacity-50" />
          )}
        </button>
        <div className="min-w-0 flex-1">
          <p className="en-title-lg border-gray4 truncate border-b pb-1 text-black">
            {user.name}
          </p>
          <p className="ko-caption-1 text-gray4 mt-2">
            *1자 이상 10자 이내의 한글, 영문, 숫자 입력 가능
          </p>
          <p className="ko-caption-1 text-gray3 truncate">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
