import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Skill() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <div className="w3-container w3-green w3-padding-64">
        <div className="w3-row-padding">
          <div className="w3-col m6" data-aos="fade-right">
            <h3>Skills.</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod<br />
              tempor incididunt ut labore et dolore.
            </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod<br />
              tempor incididunt ut labore et dolore.
            </p>
          </div>
          <div className="w3-col m6" data-aos="fade-left">
            <p className="w3-wide"><i className="fa fa-camera w3-margin-right"></i>REGISTRATION SYSTEM</p>
            <div className="w3-grey">
              <div className="w3-container w3-dark-grey w3-center" style={{ width: "100%" }}>100%</div>
            </div>
            <p className="w3-wide"><i className="fa fa-desktop w3-margin-right"></i>INTERACTIVE</p>
            <div className="w3-grey">
              <div className="w3-container w3-dark-grey w3-center" style={{ width: "100%" }}>100%</div>
            </div>
            <p className="w3-wide"><i className="fa fa-desktop w3-margin-right"></i>TOUCHSCREEN GAME</p>
            <div className="w3-grey">
              <div className="w3-container w3-dark-grey w3-center" style={{ width: "100%" }}>100%</div>
            </div>
            <p className="w3-wide"><i className="fa fa-desktop w3-margin-right"></i>SYSTEM INTEGRATION</p>
            <div className="w3-grey">
              <div className="w3-container w3-dark-grey w3-center" style={{ width: "100%" }}>100%</div>
            </div>
            <p className="w3-wide"><i className="fa fa-photo w3-margin-right"></i>MUSEUM</p>
            <div className="w3-grey">
              <div className="w3-container w3-dark-grey w3-center" style={{ width: "100%" }}>100%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skill;
