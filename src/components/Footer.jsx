import React from 'react';
import 'aos/dist/aos.css';

function Footer() {
  return (
    <footer className="w3-center  w3-padding-64">
      <a href="/" className="w3-button w3-dark-grey w3-hover-light-green" style={{ marginBottom: "16px" }}><i className="fa fa-arrow-up w3-margin-right"></i>To home</a>
      
      <div className="w3-content " data-aos="fade-up">
        <div className="sitemap">
          <h4 className="w3-margin-bottom ">Sitemap</h4>
          <p>
            <a href="/about" className="w3-hover-opacity ">About Us</a> <br />
            <a href="/contact" className="w3-hover-opacity">Contact Us</a> <br />
            <a href="/pricing" className="w3-hover-opacity">Plans and Pricing</a> <br />
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
