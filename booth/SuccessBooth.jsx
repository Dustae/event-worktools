import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './SuccessBooth.css';

const SuccessBooth = () => {
  return (
    <div className="success-body">
      <div className="success-container">
        <FaCheck className="success-icon" />
        <h1 className='text44'>Check-In Success</h1>
        <p className='text45'>Congratulations! Your check-in was successful.</p>
        <Link to="/" className="back-button">
          Back
        </Link>
      </div>
    </div>
  );
};

export default SuccessBooth;
