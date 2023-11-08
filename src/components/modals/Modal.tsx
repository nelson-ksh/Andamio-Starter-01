import React from 'react';
import styles from '../../styles/Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  content: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, content }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <div className={styles.closeButton} onClick={closeModal}>
          <div className='text-4xl'>&times;</div>
        </div>
        {content}
      </div>
    </div>
  );
};

export default Modal;