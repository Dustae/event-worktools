import React, { useState } from 'react';
import { FaUser, FaCheckCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterBooth.css';

const RegisterBooth = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
  });
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setShowPopup(true); // Show the popup icon

    try {
      const response = await axios.post('https://api.example.com/register', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error registering user:', error);
    }

    setTimeout(() => {
      setShowPopup(false); // Hide the popup icon after 3 seconds
      navigate('/successbooth'); // Navigate to the success page after registration
    }, 1000);
  };

  return (
    <div className="body11">
      <div className="wrapper11">
        <FaUser className="icon11" />
        <form onSubmit={handleRegister}>
          <h1>RegisterUser</h1>
          <div className="input-box11">
            <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="input-box11">
            <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div className="input-box11">
            <input type="text" placeholder="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          </div>
          <div className="input-box11">
            <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <button type="submit">Register</button>
          <div className="register-link11">
            <p>Already have an account? <Link to="/loginbooth">Login</Link></p>
          </div>
        </form>
        {showPopup && (
          <div className="popup11">
            <FaCheckCircle className="check-icon11" />
            <p>Successful!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterBooth;
