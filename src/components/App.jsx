import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import { getPhoto } from '../Services/getPhoto';
import { animateScroll as scroll } from 'react-scroll';
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { ButtonLoadMore } from './Button/Button';
import Notiflix from 'notiflix';

export const App = () => {
  // state = {
  //   searchValue: '',
  //   gallery: [],
  //   error: '',
  //   status: 'stoped',
  //   page: 1,
  //   showBtn: false,
  // };
  const [searchValue, setsearchValue] = useState('');
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('stoped');
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);
  const [flag, setFlag] = useState(0);

// componentDidUpdate(_, prevState) {
//     const { searchValue, page } = this.state;

//     if (
//       prevState.searchValue !== searchValue ||
//       prevState.page !== page
//     ) {
//       this.setState({ status: 'pending' });

//       getPhoto(searchValue, page)
//         .then(response => response.json())
//         .then(photo => {
//           this.setState(prevState => ({
//             gallery: [...prevState.gallery, ...photo.hits],
//             status: 'resolved',
//             isLoading: true,
//             showBtn: page < Math.ceil(photo.totalHits / 12),
            
//           }))
//             ;
//           if (page === 1) {
//             Notiflix.Notify.success(
//               `We have just found ${photo.totalHits} photos for you...`
//             );
//           }
//         })
//         .catch(error => {
//           this.setState({ error, status: 'rejected' });
//         });
//     }
//   }

  

  function handleSubmit(value) {
    setsearchValue(value);
    setGallery([]);
    setPage(1);
    setStatus('pending');
    setShowBtn(false);
    setFlag(true);
  };

  function handleLoad() {
    scroll.scrollMore(window.innerHeight - 125);
    setPage(page + 1);
  };

useEffect(() => {
    function getPhotos() {
      if ((searchValue && flag) || page !== 1) {
        getPhoto(searchValue, page)
          .then(data => {
            setGallery(prevState => [...prevState, ...data.hits]);
            setStatus('resolved');
            setShowBtn(page < Math.ceil(data.totalHits / 12));
            setFlag(false);
            if (page === 1) {
              Notiflix.Notify.success(
                `We have just found ${data.totalHits} photos for you...`
              );
            }
          })
          .catch(error => {
            setError(error);
            setStatus('rejected');
          });
      }
    }

    getPhotos();
  }, [searchValue, page, flag]);


  // const { gallery, status, error, showBtn } = this.state;
    return (
    <Container>
      <Searchbar onSearch={handleSubmit} />
      <ImageGallery gallery={gallery} status={status} error={error} />
      {showBtn && <ButtonLoadMore handleLoad={handleLoad} />}
    </Container>
  );
};

Notiflix.Notify.init({
  width: '400px',
  position: 'center-top',
  distance: '100px',
  fontSize: '20px',
  timeout: 1500,
});