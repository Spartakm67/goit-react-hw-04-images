import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalItem, ModalOverlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.close();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.close();
    }
  };

  render() {
    return createPortal(
      <ModalOverlay onClick={this.handleBackdropClick}>
        <ModalItem>{this.props.children}</ModalItem>
      </ModalOverlay>,
      modalRoot
    );
  }
}

export default Modal;
