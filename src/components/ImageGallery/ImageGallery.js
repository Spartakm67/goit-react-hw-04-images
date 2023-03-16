import Loader from '../Loader/Loader';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { GalleryUl } from './ImageGallery.styled';

const ImageGallery = ({ status, error, gallery }) => {
  if (status === 'pending') return <Loader />;

  if (status === 'resolved')
    return (
      <>
        <GalleryUl>
          {gallery.map(photo => {
            return <ImageGalleryItem key={photo.id} photo={photo} />;
          })}
        </GalleryUl>
      </>
    );

  if (status === 'rejected') {
    return (
      <div>
        <h2>{error}</h2>
      </div>
    );
  }
};

export default ImageGallery;