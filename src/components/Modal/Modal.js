import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalItem, ModalOverlay } from './Modal.styled';
import { ModalImage } from '../ImageGalleryItem/ImageGalleryItem.styled';

const modalRoot = document.querySelector('#modal-root');

function Modal({ close, alt, src }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
});

  function handleKeyDown(e) {
    if (e.code === 'Escape') {
      close();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      close();
    }
  };

   return createPortal(
      <ModalOverlay onClick={handleBackdropClick}>
        <ModalItem>
          <ModalImage src={src} alt={alt} />
        </ModalItem>
      </ModalOverlay>,
      modalRoot
    );
};


export default Modal;
