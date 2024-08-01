import React, { useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import axios from 'axios';
import './ConfirmBooth.css';

const ConfirmBooth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, bannerUrl, bgUrl } = location.state || {};
  const [showPopup, setShowPopup] = useState(false);


  const handleCheckIn = async () => {
    try {
      const eventData = JSON.parse(sessionStorage.getItem('eventData')) || {};
      const eventName = eventData.name ;
      const updateData = {
        id: result.id,
        event_name: eventName
      };
      console.log(updateData);
      await axios.put('https://event-worktools-api.vercel.app/v1/api/participant/private', updateData);
      setShowPopup(true);
      // navigate('/successbooth'); // Navigate to the success page after confirming
    } catch (error) {
      console.error('Error checking in:', error);
      // You can handle the error here, e.g., show an error message to the user
    }
    setTimeout(() => {
      setShowPopup(false); // Hide the popup icon after 1 second
      // navigate('/successbooth'); // Navigate to the success page after registration
    }, 5000);
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (!result) {
    return <div className="no-data-message">No data available. Please go back and search again.</div>;
  }

  return (
    <div className="body33" style={{ backgroundImage: `url(${bgUrl})` }}>
      <div className="checkin-container33">
        <div className="checkin-wrapper33">
          {bannerUrl && <img src={bannerUrl} alt="Banner" className="bannerImage" />}
          {/* <FaCheck className="checkin-icon33" /> */}
          <h1 className="confirm-heading">Confirm Details</h1>
          <p className="confirm-subheading">Please confirm your details:</p>
          <div className="result-item33">
            <p><strong>Name:</strong> {result.name}</p>
            <p><strong>Surname:</strong> {result.surname}</p>
            <p><strong>Phone:</strong> {result.phone}</p>
            <p><strong>Email:</strong> {result.email}</p>
          </div>
          <button className="checkin-button33" onClick={handleCheckIn}>
            Check-In
          </button>
          <button className="back-button33" onClick={handleBack}>
            Back
          </button>
          {showPopup && (
          <div className="popup11">
            <FaCheck className="success-icon" />
            <p> เช็คอินสำเร็จ!</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooth;
