import BorderBtn from "@/components/common/BorderBtn";

interface ProfileActionsProps {
  onEditName?: () => void;
  onOpenAward?: () => void;
  onCheckCard?: () => void;
}

export default function ProfileActions({
  onEditName,
  onOpenAward,
  onCheckCard,
}: ProfileActionsProps) {
  return (
    <div className="flex flex-col gap-[0.875rem]">
      <div className="flex gap-[0.875rem]">
        <BorderBtn
          text="Edit Name"
          px="px-4"
          py="py-[0.625rem]"
          className="flex-1 whitespace-nowrap"
          onClick={onEditName}
        />
        <BorderBtn
          text="My Award"
          px="px-4"
          py="py-[0.625rem]"
          className="flex-1 whitespace-nowrap"
          onClick={onOpenAward}
        />
      </div>
      <BorderBtn
        text="Check My NTC Card"
        px="px-4"
        py="py-[0.625rem]"
        className="w-full whitespace-nowrap"
        onClick={onCheckCard}
      />
    </div>
  );
}
