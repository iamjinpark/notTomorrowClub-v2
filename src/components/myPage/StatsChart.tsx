import moreIcon from "@/assets/icon/setting-vertical.svg";
import type { MyPageStat } from "@/types/myPage";

interface StatsChartProps {
  stats: MyPageStat[];
  onOpenSettings?: () => void;
}

export default function StatsChart({ stats, onOpenSettings }: StatsChartProps) {
  return (
    <div className="flex flex-1 flex-col">
      {/* 막대와 컬럼 경계를 맞추려면 같은 grid를 써야 하므로, ⋮ 버튼도 마지막 컬럼 안에 둔다 */}
      <div className="ko-headline-sm text-gray3 grid grid-cols-3 items-center border-b border-black py-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="flex min-w-0 items-center justify-between gap-2 pl-2"
          >
            <span className="truncate">{s.label}</span>
            {i === stats.length - 1 && (
              <button
                type="button"
                aria-label="통계 설정"
                className="shrink-0"
                onClick={onOpenSettings}
              >
                <img src={moreIcon} alt="" className="size-5" />
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="grid min-h-[16rem] flex-1 grid-cols-3 lg:min-h-0">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex min-w-0 items-end ${
              i > 0 ? "border-gray5 border-l" : ""
            }`}
          >
            <div
              className={`${s.color} flex w-full items-end justify-end`}
              style={{ height: `${s.ratio * 100}%` }}
            >
              <span className="en-title-xl truncate pr-2 pb-3 text-[1.5rem] text-black lg:pr-4 lg:text-[2.25rem]">
                +{s.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
