import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';
import { useLocation, useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import Loader from '../../ui/Loader/Loader';
import './BooksWrapper.css';
import './Mobile.css';

const API_KEY = "AIzaSyBfMzhhfD-EuqYw0vGZeD7ezdsoIhfXPFA";

const BooksWrapper = () => {
  const [bookData, setBookData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      setIsSearching(true);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${
            isSearching ? searchQuery : 'javascript'
          }&startIndex=${startIndex}&maxResults=20&key=${API_KEY}`
        );
        if (res.data.items && res.data.items.length > 0) {
          setBookData((prevData) => [...prevData, ...res.data.items]);
          if (isSearching) {
            setSearchResults((prevData) => [...prevData, ...res.data.items]);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, [startIndex, isSearching]);

  const handleLoadMore = () => {
    setStartIndex((prevIndex) => prevIndex + 20);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    setSearchQuery(query);
    setStartIndex(0);
    setBookData([]);
    setSearchResults([]);
    setIsSearching(true);
    navigate(`?q=${query}`);
  };

  const handleClear = () => {
    setSearchQuery('');
    setStartIndex(0);
    setBookData([]);
    setSearchResults([]);
    setIsSearching(false);
    navigate('/', { replace: true });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <form className="search-books" onSubmit={handleSearch}>
            <input
              type="text"
              name="search"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="search-books-buttons">
              <CiSearch className="icon-search" />
              <button type="submit" disabled={!searchQuery}>
                Search
              </button>
              <button
                type="button"
                onClick={handleClear}
                disabled={!searchQuery}
              >
                Clear
              </button>
            </div>
          </form>
          <div className="grid">
            {isSearching ? (
              <BookCard book={searchResults} />
            ) : (
              <BookCard book={bookData} />
            )}
          </div>
          <button className="load-more-button" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default BooksWrapper;
