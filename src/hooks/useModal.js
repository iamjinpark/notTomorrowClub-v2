import { useState, useCallback } from "react";

/**
 * 모달 상태와 제어 함수를 제공하는 커스텀 훅
 * @param {boolean} defaultOpen - 초기 열림 상태 (기본: false)
 * @returns {object} - { isOpen, openModal, closeModal, toggleModal }
 */
export function useModal(defaultOpen = false) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };
}

/**
 * 여러 모달을 관리하는 훅
 * @param {string[]} modalNames - 모달 이름 배열
 * @returns {object} - 각 모달별 제어 함수들
 */
export function useModals(modalNames = []) {
  const [modals, setModals] = useState(
    modalNames.reduce(
      (acc, name) => ({
        ...acc,
        [name]: false,
      }),
      {}
    )
  );

  const openModal = useCallback((name) => {
    setModals((prev) => ({ ...prev, [name]: true }));
  }, []);

  const closeModal = useCallback((name) => {
    setModals((prev) => ({ ...prev, [name]: false }));
  }, []);

  const closeAllModals = useCallback(() => {
    setModals((prev) =>
      Object.keys(prev).reduce(
        (acc, key) => ({
          ...acc,
          [key]: false,
        }),
        {}
      )
    );
  }, []);

  const toggleModal = useCallback((name) => {
    setModals((prev) => ({ ...prev, [name]: !prev[name] }));
  }, []);

  return {
    modals,
    openModal,
    closeModal,
    closeAllModals,
    toggleModal,
    isOpen: (name) => modals[name] || false,
  };
}
