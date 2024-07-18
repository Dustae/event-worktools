import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './SuccessRegister.css';

const SuccessRegister = () => {
  return (
    <div className="success-body1122">
      <div className="success-container1122">
        <FaCheck className="success-icon1122" />
        <h1 className='text1122'>Check-In Success</h1>
        <p className='text1122'>Congratulations! Your check-in was successful.</p>
        <Link to="/" className="back-button1122">
          Back
        </Link>
      </div>
    </div>
  );
};

export default SuccessRegister;
