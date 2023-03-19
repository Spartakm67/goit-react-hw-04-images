import { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import {
    SearchbarContainer, SearchForm, SearchFormButton,
    SearchFormButtonLabel, SearchFormInput
} from './Searchbar.styled';
import Notiflix from 'notiflix';

export const Searchbar = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleChange = event => {
    // const newSearch = event.target.value;
    setValue(event.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) {
      Notiflix.Notify.failure(
        'Please, enter search data...');
    } else {
      onSearch(value);
    }
    setValue('');
  };

    return (
      <SearchbarContainer>
        <SearchForm onSubmit={handleSubmit} status={'pending'}>
          <SearchFormInput
            autocomplete="off"
            autoFocus
            type="text"
            placeholder="Search images and photos"
            aria-label="Search"
            value={value}
            onChange={handleChange}
          />
                <SearchFormButton type="submit">
                 <BiSearchAlt
                  style={{
                  height: '32px',
                  width: '32px',
                }}
                 />
                  <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                </SearchFormButton>
        </SearchForm>
      </SearchbarContainer>
    );
  }


Notiflix.Notify.init({
  width: '400px',
  position: 'center-top',
  distance: '100px',
  fontSize: '20px',
  timeout: 1500,
});