import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import './ConfirmBooth.css';

const ConfirmBooth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result } = location.state || {};

  const handleCheckIn = () => {
    // Add any check-in logic here, e.g., sending data to an API
    navigate('/successbooth'); // Navigate to the success page after confirming
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!result) {
    return <div>No data available. Please go back and search again.</div>;
  }

  return (
    <div className="body1_1">
      <div className="checkin-container">
        <div className="checkin-wrapper">
          <FaCheck className="checkin-icon" />
          <h1>Confirm Details</h1>
          <p>Please confirm your details:</p>
          <div className="result-item">
            <p>{result.name}</p>
            <p>{result.phone}</p>
            <p>{result.email}</p>
          </div>
          <button className="checkin-button" onClick={handleCheckIn}>
            Check-In
          </button>
          <button className="checkin-button" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooth;
