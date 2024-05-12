import React from 'react';
import "./ConfirmationModal.css";
import './Mobile.css';

const ConfirmationModal = ({ favorite, onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>
          Are you sure you want to remove "{favorite.title}" from favorites?
        </h3>
        <div className="modal-actions">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
