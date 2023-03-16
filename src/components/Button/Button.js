import { LoadMoreButton } from './Button.styled';

export const ButtonLoadMore = ({ handleLoad }) => {
  return (
    <LoadMoreButton type="button" onClick={handleLoad}>
      Load more
    </LoadMoreButton>
  );
};