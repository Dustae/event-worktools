import React from "react";
import { Link } from "react-router-dom";
import './CheckIn.css'
import { FaUser, FaLock } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { RiShieldUserFill } from "react-icons/ri";

const CheckIn = () => {

  return (
    <div className="body">
      <Link to="/" className="back-link">
        <IoMdArrowBack className="back-icon" />
      </Link>

      <div className="wrapper">
      <RiShieldUserFill  className='icon3'/>
        <form action="">
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" required />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <FaLock className="icon" />
          </div>
          <button type="submit">Login</button>
          <div className="register-link">
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckIn;
