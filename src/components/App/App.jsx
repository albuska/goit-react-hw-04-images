import { useState, useEffect } from 'react';
import { GlobalStyle } from '../GlobalStyle';
import { AppContainer } from './App.styled';
import { SearchBar } from '../Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { toast } from 'react-toastify';

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);

  const handleSearchFormSubmit = inputValue => {
    setInputValue(inputValue);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    setLoading(true);
    if (inputValue === '') {
      return;
    }
    fetch(
      `https://pixabay.com/api/?q=${inputValue}&page=${page}&key=33675530-14a54e49ac2d12a2b0a037dca&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(
          new Error(`Oops...No such name found ${inputValue}`)
        );
      })
      .then(data => {
        if (data.hits.length === 0) {
          toast.error(`Oops...No such name found ${inputValue}`);
        }
        const pages = Math.ceil(data.totalHits / 12);
        setImages(prevState => [...prevState, ...data.hits]);
        setTotalPage(pages);
        setLoading(true);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [inputValue, page]);

  const handleReadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const showButton = images.length >= 12;

  return (
    <AppContainer>
      <SearchBar onSubmit={handleSearchFormSubmit} />
      {error && <h1>{error.message}</h1>}
      {images.length > 0 && <ImageGallery images={images} />}
      {/* {loading && (
        <div>
          <Loader />
        </div>
      )} */}

      {showButton && !loading && page < totalPage && (
        <Button onClick={handleReadMore} />
      )}
      <GlobalStyle />
      <ToastContainer autoClose={3000} />
    </AppContainer>
  );
};
