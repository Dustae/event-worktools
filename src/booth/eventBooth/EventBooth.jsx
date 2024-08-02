import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginBooth from '../LoginBooth/LoginBooth';
import RegisterBooth from '../RegisterBooth/RegisterBooth';
import ConfirmBooth from '../ConfirmBooth/ConfirmBooth';
import '../LoginBooth/LoginBooth.css';
import '../RegisterBooth/RegisterBooth.css';
import { useLocation } from 'react-router-dom';

const EventBooth = () => {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bgImage, setBgImage] = useState('');
  const [bannerImage, setBannerImage] = useState('');

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const eventName = query.get('event_name');

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`https://event-worktools-api.vercel.app/v1/api/org/single_event?event_name=${eventName}`);
        setEventData(response.data.eventData[0]); // Access the first item in the eventData array
        sessionStorage.setItem('eventData', JSON.stringify(response.data.eventData[0])); // Store in session storage
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventName]);

  // useEffect(() => {
  //   const loadImages = async () => {
  //     if (eventData) {
  //       try {
  //         const fetchImage = async (imageName) => {
  //           const response = await axios.get(`https://myapi/getpic?name=${imageName}`);
  //           return response.data.url;
  //         };

  //         const bgUrl = await fetchImage(eventData.bg);
  //         const bannerUrl = await fetchImage(eventData.banner);
  //         setBgImage(bgUrl);
  //         setBannerImage(bannerUrl);
  //       } catch (error) {
  //         console.error('Error loading images:', error);
  //       }
  //     }
  //   };

  //   loadImages();
  // }, [eventData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading event data</div>;

  return (
    // <div className="event-page" style={{ backgroundImage: `url(${bgImage})` }}>
    //   <img src={bannerImage} alt="Event Banner" className="event-banner" />
    <div>
      {eventData && eventData.event_type === 'private' && <LoginBooth />}
      {eventData && eventData.event_type === 'public' && <RegisterBooth />}
    </div>
    // </div>
  );
};

export default EventBooth;
