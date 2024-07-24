import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { RiEdit2Fill } from "react-icons/ri";
import "./EventDetail.css";

const EventDetail = () => {
  const { eventId } = useParams();
  const [eventName, setEventName] = useState("");
  const [eventDetail, setEventDetail] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [privacy, setPrivacy] = useState("private");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch event details using event ID
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`/v1/api/org/event/${eventId}`);
        const eventDetails = response.data;
    
        // Check if eventDetails exists and has the expected properties
        if (eventDetails) {
          setEventName(eventDetails.name || "");
          setEventDetail(eventDetails.detail || "");
          setEventLocation(eventDetails.location || "");
          setProfileImage(eventDetails.profileImage || "");
          setPrivacy(eventDetails.privacy || "private");
        } else {
          console.error('Unexpected event details format:', eventDetails);
        }
      } catch (error) {
        console.error('Error fetching event details', error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSave = async () => {
    const updatedEvent = {
      name: eventName,
      detail: eventDetail,
      location: eventLocation,
      profileImage: profileImage,
      privacy: privacy
    };

    try {
      await axios.put(`/v1/api/org/event/${eventId}`, updatedEvent);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating event details', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="event-detail-container">
      <div className="profile-section">
        <img src={profileImage} alt="Profile" className="profile-image" />
        {isEditing && (
          <label className="change-profile-button">
            CHANGE PROFILE
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
          </label>
        )}
        {isEditing && (
          <div className="privacy-options">
            <label>
              <input type="radio" name="privacy" value="private" checked={privacy === "private"} onChange={() => setPrivacy("private")} /> Private
            </label>
            <label>
              <input type="radio" name="privacy" value="public" checked={privacy === "public"} onChange={() => setPrivacy("public")} /> Public
            </label>
          </div>
        )}
      </div>
      <div className="event-details-section">
        <div className="input-section">
          <label htmlFor="event-name">EVENT NAME</label>
          <div className="input-wrapper">
            {isEditing ? (
              <>
                <input type="text" id="event-name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
                <button className="edit-button"><i className="fa fa-pencil"></i></button>
              </>
            ) : (
              <p>{eventName}</p>
            )}
          </div>
        </div>
        <div className="input-section">
          <label htmlFor="event-detail">EVENT DETAIL</label>
          <div className="input-wrapper">
            {isEditing ? (
              <>
                <textarea id="event-detail" value={eventDetail} onChange={(e) => setEventDetail(e.target.value)}></textarea>
                <button className="edit-button"><i className="fa fa-pencil"></i></button>
              </>
            ) : (
              <p>{eventDetail}</p>
            )}
          </div>
        </div>
        <div className="input-section">
          <label htmlFor="event-location">EVENT LOCATION</label>
          <div className="input-wrapper">
            {isEditing ? (
              <>
                <textarea id="event-location" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)}></textarea>
                <button className="edit-button"><i className="fa fa-pencil"></i></button>
              </>
            ) : (
              <p>{eventLocation}</p>
            )}
          </div>
        </div>
        {!isEditing && <p>{privacy.charAt(0).toUpperCase() + privacy.slice(1)}</p>}
        <div className="action-buttons">
          {isEditing ? (
            <>
              <button className="cancel-button" onClick={() => setIsEditing(false)}>CANCEL</button>
              <button className="save-button" onClick={handleSave}>SAVE</button>
            </>
          ) : (
            <button className="edit-button" onClick={handleEdit}><RiEdit2Fill /></button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
