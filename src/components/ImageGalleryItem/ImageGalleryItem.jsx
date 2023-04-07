import { useState } from 'react';
import {
  ImageGalleryItemLi,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ webformatURL, user, largeImageURL }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <ImageGalleryItemLi>
      <ImageGalleryItemImage
        src={webformatURL}
        alt={user}
        onClick={handleOpenModal}
      />
      {isOpenModal && (
        <Modal
          image={largeImageURL}
          user={user}
          closeModal={handleCloseModal}
        />
      )}
    </ImageGalleryItemLi>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
  }).isRequired,
};
