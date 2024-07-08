import React from "react";
import { Link } from "react-router-dom";
import './CheckIn.css'
import { FaUser, FaLock } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { RiShieldUserFill } from "react-icons/ri";

const CheckIn = () => {

  return (
    <div className="body78">
      <Link to="/" className="back-link78">
        <IoMdArrowBack className="back-icon78" />
      </Link>

      <div className="wrapper78">
      <RiShieldUserFill  className='icon3'/>
        <form action="">
          <h1>Login</h1>
          <div className="input-box78">
            <input type="text" placeholder="Username" required />
            <FaUser className="icon78" />
          </div>
          <div className="input-box78">
            <input type="password" placeholder="Password" required />
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
