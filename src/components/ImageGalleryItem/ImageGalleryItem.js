import { useState } from 'react';
import { ImageItem, Image } from './ImageGalleryItem.styled';
import Modal from '../Modal/Modal';

const ImageGalleryItem = photo => {
  const [showModal, setShowModal] = useState(false);
 

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const { tags, largeImageURL, webformatURL } = photo.photo;

  return (
    <>
      <ImageItem onClick={toggleModal}>
        <Image src={webformatURL} alt={tags} />
      </ImageItem>
      {showModal && (
        <Modal close={toggleModal} src={largeImageURL} alt={tags}/>             
      )}
    </>
  );
};


export default ImageGalleryItem;
