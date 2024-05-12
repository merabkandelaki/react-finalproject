import React from 'react';
import { Link } from 'react-router-dom';
import './BookCard.css';
import './Mobile.css';

const BookCard = ({ book }) => {
  console.log(book);

  if (!book || book.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {book.map((item, index) => {
        let thumbnail =
          item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail;
        if (thumbnail !== undefined) {
          return (
            <div className="book-card" key={`${item.id}-${index}`}>
              <img src={thumbnail} alt="" />
              <div className="book-card-info">
                <div className="book-card-title-author-publisher">
                  <span className="book-card-title">
                    Title: {item.volumeInfo.title}
                  </span>
                  <span className="book-card-author">
                    Authors: {item.volumeInfo.authors}
                  </span>
                  <span className="book-card-publisher">
                    Publisher: {item.volumeInfo.publisher}
                  </span>
                </div>
                <Link to={`/book/${item.id}`}>
                  <button className="book-card-button">Details</button>
                </Link>
              </div>
            </div>
          );
        }
        return null;
      })}
    </>
  );
};

export default BookCard;
