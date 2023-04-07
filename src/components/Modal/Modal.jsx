import { OverlayModal, ModalWindow } from './Modal.styled';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ closeModal, image, user }) => {
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  })

  const handleKeydown = event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

    return (
      <OverlayModal onClick={handleBackdropClick}>
        <ModalWindow>
          <img src={image} alt={user} />
        </ModalWindow>
      </OverlayModal>
    );
  }

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};
