import React from 'react';
import { FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterBooth.css';

const RegisterBooth = () => {
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    // Add any registration logic here, e.g., sending data to an API
    navigate('/successbooth'); // Navigate to the success page after registration
  };

  return (
    <div className="body11">
      <div className="wrapper11">
        <FaUser className="icon11" />
        <form onSubmit={handleRegister}>
          <h1>Register</h1>
          <div className="input-box11">
            <input type="text" placeholder="First Name" required />
          </div>
          <div className="input-box11">
            <input type="text" placeholder="Last Name" required />
          </div>
          <div className="input-box11">
            <input type="text" placeholder="Phone Number" required />
          </div>
          <div className="input-box11">
            <input type="text" placeholder="Email" required />
          </div>
          <button type="submit">Register</button>
          <div className="register-link11">
            <p>Already have an account? <Link to="/loginbooth">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterBooth;
