import React from 'react';
import "./Header.css";

function Header() {
  return (
    <header className="bgimg-1 w3-display-container w3-grayscale-min" id="home">
      <div className="w3-display-left w3-text-white header-content">
        <span className="w3-jumbo w3-hide-small animated-text">Keep Your Imagination Rolling</span><br />
        <span className="w3-xxlarge w3-hide-large w3-hide-medium">Start something that matters</span><br />
        <span className="w3-large">Tell us about your project ideas or just say hello. Whether you’ve got a big idea or need some inspiration with a building project, we are here to create perfect buildings. From concept to creation, let us inspire you.</span>
        <p><a href="/about" className="w3-button w3-white w3-padding-large w3-large w3-margin-top button-animation">Learn more and Start today</a></p>
      </div>
      <div className="scroll-down">
        <span>Scroll Down</span>
        <div className="mouse-icon">
          <div className="wheel"></div>
        </div>
      </div>
    </header>
  );
}

export default Header;
