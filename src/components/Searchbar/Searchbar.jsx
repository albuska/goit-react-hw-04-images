import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  SearchbarContainer,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';

export const SearchBar = ({ onSubmit }) => {
  
  const [searchValue, setSearchValue] = useState(''); 

 const handleSubmit = event => {
    event.preventDefault();
    if (searchValue.trim() === '') {
      toast.error('Search images and photos');
      return;
    }
   onSubmit(searchValue);
   setSearchValue(''); 
  };

  const handleInputChange = event => {
    setSearchValue(event.currentTarget.value.toLowerCase());
  };

    return (
      <SearchbarContainer>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormButton type="submit">
            <ImSearch />
          </SearchFormButton>

          <SearchFormInput
            name="inputValue"
            type="text"
            autocomplete="off"
            placeholder="Search images and photos"
            value={searchValue}
            onChange={handleInputChange}
          />
        </SearchForm>
      </SearchbarContainer>
    );
  }
