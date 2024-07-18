import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './CheckIn.css';
import { FaUser, FaLock } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { FaUserTie } from "react-icons/fa";

const CheckIn = () => {

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;

    try {
      const response = await axios.post('YOUR_API_ENDPOINT', {
        username,
        password
      });

      if (response.data.isAuthenticated) {
        window.location.href = "/home";
      } else {
        alert("Authentication failed!");
      }
    } catch (error) {
      console.error('There was an error!', error);
      alert("Authentication failed!");
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
          <button type="submit">Login</button>
          <div className="register-link78">
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckIn;
