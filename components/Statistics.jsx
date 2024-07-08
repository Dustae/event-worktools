import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Statistics() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <div className="w3-container w3-dark-green w3-row w3-center w3-padding-64">
        <div className="w3-quarter" data-aos="fade-up">
          <span className="w3-xxlarge">10+</span>
          <br />Partners
        </div>
        <div className="w3-quarter" data-aos="fade-up" data-aos-delay="100">
          <span className="w3-xxlarge">55+</span>
          <br />All Event
        </div>
        <div className="w3-quarter" data-aos="fade-up" data-aos-delay="200">
          <span className="w3-xxlarge">89+</span>
          <br />All System
        </div>
        <div className="w3-quarter" data-aos="fade-up" data-aos-delay="300">
          <span className="w3-xxlarge">150+</span>
          <br />TouchScreenGame
        </div>
      </div>
    </div>
  );
}

export default Statistics;
