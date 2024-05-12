import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../ui/Loader/Loader';
import './BookDetails.css';
import './Mobile.css';

const API_KEY = "AIzaSyBfMzhhfD-EuqYw0vGZeD7ezdsoIhfXPFA";

const BookDetails = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`
        );
        setBookDetails(response.data);

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isBookInFavorites = favorites.some((fav) => fav.id === id);
        setIsFavorite(isBookInFavorites);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav.id !== id)
      : [
          ...favorites,
          {
            id,
            img: bookDetails.volumeInfo.imageLinks.thumbnail,
            title: bookDetails.volumeInfo.title,
            author: bookDetails.volumeInfo.authors,
            date: bookDetails?.volumeInfo?.publishedDate,
            publisher: bookDetails.volumeInfo.publisher,
          },
        ];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  if (!bookDetails) {
    return <Loader />;
  }

  const { volumeInfo } = bookDetails;

  return (
    <div className="book-details-container">
      <div className="book-details-box">
        <div className="book-details-image">
          <img src={volumeInfo.imageLinks?.thumbnail} alt={volumeInfo.title} />
        </div>
        <div className="book-detail-info">
          <div className="book-detail-title-desc">
            <span>Description</span>
            <p
              className="book-detail-desc"
              dangerouslySetInnerHTML={{ __html: volumeInfo.description }}
            ></p>
          </div>
          <div className="book-detail-additional-info">
            <span>Additional Information</span>
            <div className="book-detail-title-authors-date-publisher">
              <p className="book-detail-title">
                <span>Title:</span> {volumeInfo.title}
              </p>
              <p className="book-detail-authors">
                <span>Authors:</span> {volumeInfo.authors}
              </p>
              <p className="book-detail-date">
                <span>Date:</span> {volumeInfo.publishedDate}
              </p>
              <p className="book-detail-publisher">
                <span>Publisher:</span> {volumeInfo.publisher}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="favorite-add-delete">
        {isFavorite ? (
          <Link to={`/favorites`}>
            <button className="favorite-delete" onClick={handleToggleFavorite}>
              Remove Favorites
            </button>
          </Link>
        ) : (
          <Link to={`/favorites`}>
            <button className="favorite-add" onClick={handleToggleFavorite}>
              Add Favorites
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
