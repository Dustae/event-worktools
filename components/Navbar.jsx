import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isToggled, setIsToggle] = useState(false);

  function w3_open() {
    setIsToggle(!isToggled);
  }

  function w3_close() {
    setIsToggle(false);
  }

  return (
    <>
      <div className="w3-top">
        <div className="w3-bar w3-green w3-card" id="myNavbar">
          <NavLink to="/" className="w3-bar-item w3-button w3-wide">EVENTMANAGE</NavLink>
          <div className="w3-right w3-hide-small">
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'w3-bar-item w3-button active' : 'w3-bar-item w3-button')}>ABOUT</NavLink>
            <NavLink to="/team" className={({ isActive }) => (isActive ? 'w3-bar-item w3-button active' : 'w3-bar-item w3-button')}><i className="fa fa-user"></i> TEAM</NavLink>
            <NavLink to="/work" className={({ isActive }) => (isActive ? 'w3-bar-item w3-button active' : 'w3-bar-item w3-button')}><i className="fa fa-th"></i> WORK</NavLink>
            <NavLink to="/pricing" className={({ isActive }) => (isActive ? 'w3-bar-item w3-button active' : 'w3-bar-item w3-button')}><i className="fa fa-usd"></i> PRICING</NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'w3-bar-item w3-button active' : 'w3-bar-item w3-button')}><i className="fa fa-envelope"></i> CONTACT</NavLink>
            <NavLink to="/checkin" className={({ isActive }) => (isActive ? 'w3-bar-item w3-button active' : 'w3-bar-item w3-button')}><i className="fa fa-sign-in"></i> Login</NavLink>
          </div>
          <button className="w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium" onClick={w3_open}>
            <i className="fa fa-bars"></i>
          </button>
        </div>
      </div>

      <nav className="w3-sidebar w3-bar-block w3-card w3-animate-left w3-hide-medium w3-hide-large" style={isToggled ? { display: "block", backgroundColor: "#7D9968" } : { display: "none", backgroundColor: "#7D9968" }} id="mySidebar">
        <button onClick={w3_close} className="w3-bar-item w3-button w3-large w3-padding-16">Close ×</button>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'w3-bar-item w3-button active' : 'w3-bar-item w3-button')} onClick={w3_close}>ABOUT</NavLink>
        <NavLink to="/team" className={({ isActive }) => (isActive ? 'w3-bar-item w3-button active' : 'w3-bar-item w3-button')} onClick={w3_close}>TEAM</NavLink>
        <NavLink to="/work" className={({ isActive }) => (isActive ? 'w3-bar-item w3-button active' : 'w3-bar-item w3-button')} onClick={w3_close}>WORK</NavLink>
        <NavLink to="/pricing" className={({ isActive }) => (isActive ? 'w3-bar-item w3-button active' : 'w3-bar-item w3-button')} onClick={w3_close}>PRICING</NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'w3-bar-item w3-button active' : 'w3-bar-item w3-button')} onClick={w3_close}>CONTACT</NavLink>
        <NavLink to="/checkin" className={({ isActive }) => (isActive ? 'w3-bar-item w3-button active' : 'w3-bar-item w3-button')} onClick={w3_close}>Login</NavLink>
      </nav>
    </>
  );
}

export default Navbar;
