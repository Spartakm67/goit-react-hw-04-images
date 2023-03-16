import { MagnifyingGlass } from 'react-loader-spinner';
import { LoaderDStyle } from './Loader.styled';

const Loader = () => {
  return (
    <LoaderDStyle>
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor = '#c0efff'
        color = '#e15b64'
      />
    </LoaderDStyle>
  );
};

export default Loader;