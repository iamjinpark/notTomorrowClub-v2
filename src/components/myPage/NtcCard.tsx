import plusIcon from "@/assets/icon/plus.svg";

interface NtcCardProps {
  issuedYear: string;
  onExit?: () => void;
}

export default function NtcCard({ issuedYear, onExit }: NtcCardProps) {
  return (
    <>
      <div className="bg-gray6 flex min-h-[13rem] flex-1 items-center justify-center rounded-md">
        <img src={plusIcon} alt="" className="size-7 opacity-50" />
      </div>
      <div className="ko-caption-1 text-gray3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <span>Issued Year : {issuedYear}</span>
        <button type="button" className="hover:text-black" onClick={onExit}>
          Exit NTC
        </button>
      </div>
    </>
  );
}
