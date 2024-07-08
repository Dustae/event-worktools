import React, { useEffect } from 'react';
import Promo from './Promo';
import AOS from 'aos';
import 'aos/dist/aos.css';

function About() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="w3-container" style={{ padding: "128px 16px" }} id="about">
      <h3 className="w3-center" style={{ fontSize: "50px" }} data-aos="fade-up">About</h3>
      <p className="w3-center w3-large" data-aos="fade-up" data-aos-delay="100">Key features</p>
      <div className="w3-row-padding w3-center" style={{ marginTop: "64px" }}>
        <div className="w3-quarter" data-aos="fade-up" data-aos-delay="200">
          <i className="fa fa-desktop w3-margin-bottom w3-jumbo w3-center"></i>
          <p className="w3-large">Responsive</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
        </div>
        <div className="w3-quarter" data-aos="fade-up" data-aos-delay="300">
          <i className="fa fa-heart w3-margin-bottom w3-jumbo"></i>
          <p className="w3-large">Passion</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
        </div>
        <div className="w3-quarter" data-aos="fade-up" data-aos-delay="400">
          <i className="fa fa-diamond w3-margin-bottom w3-jumbo"></i>
          <p className="w3-large">Design</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
        </div>
        <div className="w3-quarter" data-aos="fade-up" data-aos-delay="500">
          <i className="fa fa-cog w3-margin-bottom w3-jumbo"></i>
          <p className="w3-large">Support</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
        </div>
      </div>
      <Promo />
    </div>
  );
}

export default About;
