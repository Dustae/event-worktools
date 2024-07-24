import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './CheckIn.css';
import { FaUser, FaLock } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { FaUserTie } from "react-icons/fa";

const CheckIn = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;

    try {
      const response = await axios.post('http://localhost:3000/v1/api/org/login', {
        username,
        password
      });

      if (response.data.message === "Log in success") {
        window.location.href = "/home";
      } else {
        alert("Authentication failed: " + response.data.message);
      }
    } catch (error) {
      console.error('There was an error!', error);
      alert("Authentication failed: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body78">
      <Link to="/" className="back-link78">
        <IoMdArrowBack className="back-icon78" />
      </Link>

      <div className="wrapper78">
        <FaUserTie className="icon3" />
        <form onSubmit={handleSubmit}>
          <h1>Login Exhibitor</h1>
          
          <div className="input-box78">
            <input type="text" name="username" placeholder="Username" required />
            <FaUser className="icon78" />
          </div>
          <div className="input-box78">
            <input type="password" name="password" placeholder="Password" required />
            <FaLock className="icon78" />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="register-link78">
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckIn;
