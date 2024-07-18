import React from 'react';
import { FaUserCog } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import axios from 'axios';
import './Register.css';

const Register = () => {

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    const name = event.target.elements.name.value;
    const address = event.target.elements.address.value;
    const phoneNumber = event.target.elements.phoneNumber.value;

    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username,
        password,
        name,
        address,
        phoneNumber
      });

      if (response.data.success) {
        alert("Registration successful!");
        window.location.href = "/checkin";
      } else {
        alert("Registration failed!");
      }
    } catch (error) {
      console.error('There was an error!', error);
      alert("Registration failed!");
    }
  };

  return (
    <div className="body89">
      <Link to="/" className="back-link2">
        <IoMdArrowBack className="back-icon2" />
      </Link>
      <div className="wrapper89">
        <FaUserCog className='icon1' />
        <form onSubmit={handleSubmit}>
          <h1>Register Exhibitor</h1>
          <div className="input-box89">
            <input type="text" name="username" placeholder="Username" required />
          </div>
          <div className="input-box89">
            <input type="password" name="password" placeholder="Password" required />
          </div>
          <div className="input-box89">
            <input type="text" name="name" placeholder="Name" required />
          </div>
          <div className="input-box89">
            <input type="text" name="address" placeholder="Address" required />
          </div>
          <div className="input-box89">
            <input type="tel" name="phoneNumber" placeholder="Phone Number" required />
          </div>
          <button type="submit">Register</button>
          <div className="register-link89">
            <p>Already have an account? <Link to="/checkin">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
