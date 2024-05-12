import React, { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import './Favorites.css';
import './Mobile.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedFavorite, setSelectedFavorite] = useState(null);

  const handleRemoveFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== id)
    );
    localStorage.setItem(
      'favorites',
      JSON.stringify(favorites.filter((fav) => fav.id !== id))
    );
    setShowConfirmationModal(false);
  };

  const openConfirmationModal = (fav) => {
    setSelectedFavorite(fav);
    setShowConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  return (
    <div className="favorites-container">
      <h2>Favorites Books</h2>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="favorites-cards">
          {favorites.map((fav) => (
            <div key={fav.id} className="favorite-card">
              <img src={fav.img} alt={fav.title} />
              <div className="favorite-card-items">
                <p>
                  <span>Title:</span> {fav.title}
                </p>
                <p>
                  <span>Authors:</span> {fav.author}
                </p>
                <p>
                  <span>Date:</span> {fav.date}
                </p>
                <p>
                  <span>Publisher:</span> {fav.publisher}
                </p>
                <button onClick={() => openConfirmationModal(fav)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showConfirmationModal && (
        <ConfirmationModal
          favorite={selectedFavorite}
          onConfirm={() => handleRemoveFavorite(selectedFavorite.id)}
          onCancel={closeConfirmationModal}
        />
      )}
    </div>
  );
};

export default Favorites;
