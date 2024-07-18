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
    // Add any check-in logic here, e.g., sending data to an API
    try {
      // Replace 'https://api.example.com/checkin' with your actual API endpoint
      await axios.post('https://api.example.com/checkin', result);
      navigate('/successbooth'); // Navigate to the success page after confirming
    } catch (error) {
      console.error('Error checking in:', error);
      // You can handle the error here, e.g., show an error message to the user
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!result) {
    return <div>No data available. Please go back and search again.</div>;
  }

  return (
    <div className="body33">
      <div className="checkin-container33">
        <div className="checkin-wrapper33">
          <FaCheck className="checkin-icon33" />
          <h1>Confirm Details</h1>
          <p>Please confirm your details:</p>
          <div className="result-item33">
            <p>{result.name}</p>
            <p>{result.phone}</p>
            <p>{result.email}</p>
          </div>
          <button className="checkin-button33" onClick={handleCheckIn}>
            Check-In
          </button>
          <button className="checkin-button34" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooth;
