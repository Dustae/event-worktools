import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginBooth.css';
import ConfirmBooth from '../ConfirmBooth/ConfirmBooth';

const LoginBooth = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [error, setError] = useState(null);
  const [bannerUrl, setBannerUrl] = useState('');
  const [bgUrl, setBgUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get the banner and background filenames from session storage
    const eventData = JSON.parse(sessionStorage.getItem('eventData')) || {};
    const bannerFilename = eventData.banner || '';
    const bgFilename = eventData.bg || '';

    // Fetch the banner and background image URLs from the API
    const fetchImages = async () => {
      try {
        const bannerResponse = await axios.get(`https://event-worktools-api.vercel.app/v1/api/storage/read?filename=${bannerFilename}`);
        const bgResponse = await axios.get(`https://event-worktools-api.vercel.app/v1/api/storage/read?filename=${bgFilename}`);
        setBannerUrl(bannerResponse.data);
        setBgUrl(bgResponse.data);
      } catch (error) {
        console.error('Error fetching image URLs:', error);
      }
    };

    fetchImages();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    setError(null); // Clear any previous errors
  
    // Retrieve the event name from session storage
    const eventData = JSON.parse(sessionStorage.getItem('eventData')) || {};
    const eventName = eventData.name || '';
  
    // Determine search term type and build params
    const params = { event_name: eventName };
    if (/^\d+$/.test(searchTerm)) { // Check if searchTerm is a number
      params.phone = searchTerm;
    } else if (searchTerm.includes('@')) { // Check if searchTerm contains '@'
      params.email = searchTerm;
    } else { // Treat as name or surname
      const terms = searchTerm.split(' ').filter(Boolean);
      if (terms.length > 0) {
        const value = terms[0];
        params.name = value;
        params.surname = value;
      }
    }
  
    // Ensure at least one of the optional fields is present
    if (!params.name && !params.surname && !params.phone && !params.email) {
      setError('Please enter a valid search term (name, phone, or email).');
      return;
    }
  
    try {
      const response = await axios.get('https://event-worktools-api.vercel.app/v1/api/participant/private', { params });
      const { participantData } = response.data;
      setResults(participantData || []);
    } catch (error) {
      setError('Not found users. Please try again.');
      console.error('Error searching users:', error);
    }
  };

  const handleSelect = (result) => {
    setSelectedResult(result);
  };

  const handleNext = () => {
    if (selectedResult) {
      
      navigate('/confirmbooth', { state: { result: selectedResult, bannerUrl, bgUrl } });
    }
  };

  return (
    <div className="body22" style={{ backgroundImage: `url(${bgUrl})` }}>
      <div className="checkin-container22">
        <div className="checkin-wrapper22">
          {bannerUrl && <img src={bannerUrl} alt="Banner" className="bannerImage" />}
          <h1 className="text23">Check-In User</h1>
          <p className="text24">Enter your details to check-in</p>
          <form onSubmit={handleSearch} className="input-group22">
            <input
              type="text"
              placeholder="Search by name, phone or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
            <button type="submit" className="search-button22">Search</button>
          </form>
          {error && <p className="error-message">{error}</p>}
          <div className="search-results22">
            {results.length > 0 ? (
              results.map((result, index) => (
                <div
                  key={index}
                  className={`result-item22 ${selectedResult === result ? 'selected' : ''}`}
                  onClick={() => handleSelect(result)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && handleSelect(result)}
                >
                  <span>{result.name} </span>
                  <span>{result.surname} </span>
                  <span>{result.phone} </span>
                  <span>{result.email} </span>
                </div>
              ))
            ) : (
              <p className="text22">No results found</p>
            )}
          </div>
          {results.length > 0 && (
            <div className="results-span">
              <span>Results found:</span>
              <span>{results.length} result(s)</span>
            </div>
          )}
          <button className="checkin-button22" onClick={handleNext} disabled={!selectedResult}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginBooth;
