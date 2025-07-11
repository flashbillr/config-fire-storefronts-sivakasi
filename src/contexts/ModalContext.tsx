'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/api/client';

interface ModalState {
  isOpen: boolean;
  product: Product | null;
  type: 'product' | 'auth' | 'video' | null;
}

interface ModalContextValue extends ModalState {
  openProductModal: (product: Product) => void;
  openAuthModal: () => void;
  openVideoModal: (product: Product) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    product: null,
    type: null,
  });

  // Handle body scroll lock when modal is open
  useEffect(() => {
    if (modalState.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalState.isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && modalState.isOpen) {
        closeModal();
      }
    };

    if (modalState.isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [modalState.isOpen]);

  const openProductModal = (product: Product) => {
    setModalState({
      isOpen: true,
      product,
      type: 'product',
    });
  };

  const openAuthModal = () => {
    setModalState({
      isOpen: true,
      product: null,
      type: 'auth',
    });
  };

  const openVideoModal = (product: Product) => {
    setModalState({
      isOpen: true,
      product,
      type: 'video',
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      product: null,
      type: null,
    });
  };

  return (
    <ModalContext.Provider
      value={{
        ...modalState,
        openProductModal,
        openAuthModal,
        openVideoModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};