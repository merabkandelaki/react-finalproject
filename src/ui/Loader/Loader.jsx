import React from 'react';
import './Loader.css';
import './Mobile.css'

const Loader = () => {
  return (
    <div className="loader-container">
      <h3>Loading...</h3>
      <div className="loader-spinner"></div>
    </div>
  );
};

export default Loader;
