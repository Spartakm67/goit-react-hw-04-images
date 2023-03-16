import { Component } from 'react';
import { Container } from './App.styled';
import { getPhoto } from '../Services/getPhoto';
import { animateScroll as scroll } from 'react-scroll';
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { ButtonLoadMore } from './Button/Button';

import Notiflix from 'notiflix';

export class App extends Component {
  state = {
    searchValue: '',
    gallery: [],
    error: '',
    status: 'stoped',
    page: 1,
    showBtn: false,
  };

componentDidUpdate(_, prevState) {
    const { searchValue, page } = this.state;

    if (
      prevState.searchValue !== searchValue ||
      prevState.page !== page
    ) {
      this.setState({ status: 'pending' });

      getPhoto(searchValue, page)
        .then(response => response.json())
        .then(photo => {
          this.setState(prevState => ({
            gallery: [...prevState.gallery, ...photo.hits],
            status: 'resolved',
            isLoading: true,
            showBtn: page < Math.ceil(photo.totalHits / 12),
            
          }))
            ;
          if (page === 1) {
            Notiflix.Notify.success(
              `We have just found ${photo.totalHits} photos for you...`
            );
          }
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }
  }
  handleSubmit = searchValue => {

    if (this.state.searchValue === searchValue) {
      return Notiflix.Notify.warning(
              `We have already found " ${searchValue} " photos for you before...`
            );
    }

    this.setState({
      searchValue,
      gallery: [],
      page: 1,
      status: 'stoped',
      showBtn: false,
    });
  };

  handleLoad = () => {
    scroll.scrollMore(window.innerHeight - 125);
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
  const { gallery, status, error, showBtn } = this.state;
    return (
    <Container>
      <Searchbar onSearch={this.handleSubmit} />
      <ImageGallery gallery={gallery} status={status} error={error} />
      {showBtn && <ButtonLoadMore handleLoad={this.handleLoad} />}
    </Container>
  );
  }
};

Notiflix.Notify.init({
  width: '400px',
  position: 'center-top',
  distance: '100px',
  fontSize: '20px',
  timeout: 1500,
});