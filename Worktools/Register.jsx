import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import './Register.css';

const Register = () => {
  return (
    <div className="body89">
          <Link to="/" className="back-link2">
        <IoMdArrowBack className="back-icon2" />
           </Link>
      <div className="wrapper89">
        <FaUserCircle className='icon1' />
        <form action="">
          <h1>Register</h1>
          <div className="input-box89">
            <input type="text" placeholder="Username" required />
          </div>
          <div className="input-box89">
            <input type="password" placeholder="Password" required />
          </div>
          <div className="input-box89">
            <input type="text" placeholder="Name" required />
          </div>
          <div className="input-box89">
            <input type="text" placeholder="Address" required />
          </div>
          <div className="input-box89">
            <input type="tel" placeholder="PhoneNumber" required />
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
