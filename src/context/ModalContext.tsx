// src/context/ModalContext.tsx
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { ProductCategory } from '../data/premiumProducts';

interface ModalContextProps {
  isOpen: boolean;
  product: ProductCategory | null;
  openModal: (id: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<ProductCategory | null>(null);

  const openModal = async (id: string) => {
    // import data lazily to avoid circular deps
    const { premiumProducts } = await import('../data/premiumProducts');
    const found = premiumProducts.find((p: ProductCategory) => p.id === id) || null;
    setProduct(found);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setProduct(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, product, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
