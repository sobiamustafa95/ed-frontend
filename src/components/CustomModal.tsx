import React from 'react';

interface CustomModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
  customStyle?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  setIsOpen,
  children,
  customStyle,
}) => {
  if (!isOpen) return null;

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`fixed z-[1100] flex items-center justify-center p-4 ${customStyle}`}
      style={{ backgroundColor: 'transparent' }}
      onClick={closeModal}
    >
      <div
        className='bg-white shadow-lg rounded-lg max-w-xl w-full p-6'
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
