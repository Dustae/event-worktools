import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import axios from 'axios';
import './ConfirmBooth.css';

const ConfirmBooth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result } = location.state || {};

  const handleCheckIn = async () => {
    try {
      await axios.post('http://localhost:3000/v1/api/participant/private', result);
      navigate('/successbooth'); // Navigate to the success page after confirming
    } catch (error) {
      console.error('Error checking in:', error);
      // You can handle the error here, e.g., show an error message to the user
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (!result) {
    return <div className="no-data-message">No data available. Please go back and search again.</div>;
  }

  return (
    <div className="body33">
      <div className="checkin-container33">
        <div className="checkin-wrapper33">
          <FaCheck className="checkin-icon33" />
          <h1 className="confirm-heading">Confirm Details</h1>
          <p className="confirm-subheading">Please confirm your details:</p>
          <div className="result-item33">
            <p><strong>Name:</strong> {result.name}</p>
            <p><strong>Phone:</strong> {result.phone}</p>
            <p><strong>Email:</strong> {result.email}</p>
          </div>
          <button className="checkin-button33" onClick={handleCheckIn}>
            Check-In
          </button>
          <button className="back-button33" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooth;
