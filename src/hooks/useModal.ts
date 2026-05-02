import { useState, useCallback } from "react";

interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

interface UseModalsReturn {
  modals: Record<string, boolean>;
  openModal: (name: string) => void;
  closeModal: (name: string) => void;
  closeAllModals: () => void;
  toggleModal: (name: string) => void;
  isOpen: (name: string) => boolean;
}

export function useModal(defaultOpen = false): UseModalReturn {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle };
}

export function useModals(modalNames: string[] = []): UseModalsReturn {
  const [modals, setModals] = useState<Record<string, boolean>>(
    modalNames.reduce<Record<string, boolean>>(
      (acc, name) => ({
        ...acc,
        [name]: false,
      }),
      {},
    ),
  );

  const openModal = useCallback((name: string) => {
    setModals((prev) => ({ ...prev, [name]: true }));
  }, []);

  const closeModal = useCallback((name: string) => {
    setModals((prev) => ({ ...prev, [name]: false }));
  }, []);

  const closeAllModals = useCallback(() => {
    setModals((prev) =>
      Object.keys(prev).reduce<Record<string, boolean>>(
        (acc, key) => ({
          ...acc,
          [key]: false,
        }),
        {},
      ),
    );
  }, []);

  const toggleModal = useCallback((name: string) => {
    setModals((prev) => ({ ...prev, [name]: !prev[name] }));
  }, []);

  return {
    modals,
    openModal,
    closeModal,
    closeAllModals,
    toggleModal,
    isOpen: (name: string) => modals[name] ?? false,
  };
}
