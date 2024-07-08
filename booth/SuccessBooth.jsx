import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './SuccessBooth.css';

const SuccessBooth = () => {
  return (
    <div className="success-body">
      <div className="success-container">
        <FaCheck className="success-icon" />
        <h1>Check-Success</h1>
        <p>Congratulation</p>
        <Link to="/registerbooth" className="back-button">
          Back
        </Link>
      </div>
    </div>
  );
};

export default SuccessBooth;
