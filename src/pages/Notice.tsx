import { useState } from "react";

import Modal from "@/components/common/Modal/Modal";
import Pagination from "@/components/common/Pagination";
import NoticeItem from "@/components/notice/NoticeItem";
import PageHeader from "@/layouts/PageHeader";
import { NOTICES } from "@/api/dummyData";
import { useModal } from "@/hooks/useModal";
import type { Notice as NoticeType } from "@/types/notice";

const NOTICES_PER_PAGE = 7;

export default function Notice() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState<NoticeType | null>(null);
  const detailModal = useModal();

  const totalPages = Math.max(1, Math.ceil(NOTICES.length / NOTICES_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pageNotices = NOTICES.slice(
    (safePage - 1) * NOTICES_PER_PAGE,
    safePage * NOTICES_PER_PAGE
  );

  const openDetail = (notice: NoticeType) => {
    setSelected(notice);
    detailModal.open();
  };

  return (
    <div className="flex flex-col">
      <PageHeader
        title="What's New!"
        subtitle="달라진 점과 새로운 소식을 전해드려요"
      />

      <ul className="mt-[26px]">
        {pageNotices.map((notice) => (
          <NoticeItem key={notice.id} notice={notice} onClick={openDetail} />
        ))}
      </ul>

      <div className="mt-[45px] flex justify-center">
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {selected && (
        <Modal
          type="notice"
          isOpen={detailModal.isOpen}
          onClose={detailModal.close}
          notice={selected}
        />
      )}
    </div>
  );
}
