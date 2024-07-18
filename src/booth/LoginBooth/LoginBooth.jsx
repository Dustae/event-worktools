import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginBooth.css';

const LoginBooth = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('https://api.example.com/search', {
        params: { query: searchTerm },
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleSelect = (result) => {
    setSelectedResult(result);
  };

  const handleNext = () => {
    if (selectedResult) {
      navigate('/confirmbooth', { state: { result: selectedResult } });
    }
  };

  return (
    <div className="body22">
      <div className="checkin-container22">
        <div className="checkin-wrapper22">
          <FaCheck className="checkin-icon22" />
          <h1 className='text23'>Check-In User</h1>
          <p className='text24'>Enter your details to check-in</p>
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
          <div className="search-results22">
            {results.length > 0 ? (
              results.map((result, index) => (
                <div
                  key={index}
                  className={`result-item22 ${selectedResult === result ? 'selected' : ''}`}
                  onClick={() => handleSelect(result)}
                >
                  <span>{result.name}</span>
                  <span>{result.phone}</span>
                  <span>{result.email}</span>
                </div>
              ))
            ) : (
              <p className='text22'>No results found</p>
            )}
          </div>
          <button className="checkin-button22" onClick={handleNext} disabled={!selectedResult}>
            Next
          </button>
          <div className="register-link22">
            <p>Don't have an account? <Link to="/registerbooth">Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBooth;
