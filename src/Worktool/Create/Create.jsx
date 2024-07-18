import React, { useState } from 'react';
import { FcAddImage } from "react-icons/fc";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Create.css';

const Create = () => {
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventImage, setEventImage] = useState(null);
  const [eventDetail, setEventDetail] = useState('');
  const [eventType, setEventType] = useState('Public');
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) { // Check file size <= 2MB
      setEventImage(file);
    } else {
      alert('File size should be less than 2MB');
    }
  };

  const handleImageRemove = () => {
    setEventImage(null);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('eventName', eventName);
    formData.append('eventLocation', eventLocation);
    formData.append('eventImage', eventImage);
    formData.append('eventDetail', eventDetail);
    formData.append('eventType', eventType);

    try {
      const response = await axios.post('your-api-endpoint', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      // Assuming the response contains the created event ID
      const eventId = response.data.id;
      navigate(`/eventdetail/${eventId}`);
    } catch (error) {
      console.error('There was an error creating the event!', error);
    }
  };

  return (
    <div className="event-registration-form">
      <h2>Create Event</h2>
      <input 
        type="text" 
        placeholder="Event Name" 
        value={eventName} 
        onChange={(e) => setEventName(e.target.value)} 
        className="form-control"
      />
      <input 
        type="text" 
        placeholder="Event Location" 
        value={eventLocation} 
        onChange={(e) => setEventLocation(e.target.value)}  
        className="form-control"
      />
      <div className="image-upload">
        <label className="file-label">
          <FcAddImage className="icon" />
          <span>Upload</span>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="form-control-file"
          />
        </label>
        {eventImage && (
          <div className="uploaded-file">
            <span>{eventImage.name}</span>
            <button onClick={handleImageRemove} className="remove-btn">Remove</button>
          </div>
        )}
        <p>Upload Event Headline Image (1200x630 pixels, max 2MB)</p>
      </div>
      <textarea
        placeholder="Event Detail"
        value={eventDetail}
        onChange={(e) => setEventDetail(e.target.value)}
        className="form-control"
      ></textarea>
      <div className="radio-container">
        <label>
          <input
            type="radio"
            value="Private"
            checked={eventType === 'Private'}
            onChange={() => setEventType('Private')}
          />
          Private
        </label>
        <label>
          <input
            type="radio"
            value="Public"
            checked={eventType === 'Public'}
            onChange={() => setEventType('Public')}
          />
          Public
        </label>
      </div>
      <button onClick={handleSubmit} className="submit-btn">Submit</button>
    </div>
  );
};

export default Create;
