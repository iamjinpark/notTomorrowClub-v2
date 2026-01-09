import BorderBtn from "../BorderBtn";

/**
 * 확인/삭제 모달 컨텐츠
 */
function ConfirmModalContent({
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
}) {
  return (
    <div className="bg-white rounded-lg p-6 max-w-xs w-full mx-4 text-center space-y-6">
      {/* 경고 아이콘 */}
      <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
        <svg
          className="w-6 h-6 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>

      {/* 메시지 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{message}</p>
      </div>

      {/* 버튼들 */}
      <div className="flex space-x-3">
        <BorderBtn text={cancelText} px="px-4" py="py-2" onClick={onClose} />
        <BorderBtn
          text={confirmText}
          px="px-4"
          py="py-2"
          bg="bg-red-500 text-white hover:bg-red-600"
          onClick={() => {
            onConfirm?.();
            onClose?.();
          }}
        />
      </div>
    </div>
  );
}

export default ConfirmModalContent;
