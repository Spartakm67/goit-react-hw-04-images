import { Component } from 'react';
import { ImageItem, Image, ModalImage } from './ImageGalleryItem.styled';
import Modal from '../Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { tags, largeImageURL, webformatURL } = this.props.photo;

    return (
      <>
        <ImageItem onClick={this.toggleModal}>
          <Image src={webformatURL} alt={tags} />
        </ImageItem>
        {this.state.showModal && (
          <Modal close={this.toggleModal}>
            <ModalImage src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
