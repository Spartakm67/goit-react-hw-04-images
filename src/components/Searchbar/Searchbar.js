import { Component } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import {
    SearchbarContainer, SearchForm, SearchFormButton,
    SearchFormButtonLabel, SearchFormInput
} from './Searchbar.styled';
import Notiflix from 'notiflix';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.value)
      return  Notiflix.Notify.failure(
        'Please, enter search data...')
        
    this.props.onSearch(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <SearchbarContainer>
        <SearchForm onSubmit={this.handleSubmit} status={'pending'}>
          <SearchFormInput
            autocomplete="off"
            autoFocus
            type="text"
            placeholder="Search images and photos"
            aria-label="Search"
            value={this.state.value}
            onChange={this.handleChange}
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
}

Notiflix.Notify.init({
  width: '400px',
  position: 'center-top',
  distance: '100px',
  fontSize: '20px',
  timeout: 1500,
});