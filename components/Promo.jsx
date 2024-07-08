import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Promo() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <div className="w3-container w3-green" style={{ padding: "128px 16px" }}>
        <div className="w3-row-padding">
          <div className="w3-col m6" data-aos="fade-right">
            <h3>Feature</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod<br />tempor incididunt ut labore et dolore.</p>
            <p>
              <a href="/work" className="w3-button w3-green">
                <i className="fa fa-th"> </i> View Our Works
              </a>
            </p>
          </div>
          <div className="w3-col m6" data-aos="fade-left">
            <img
              className="w3-image w3-round-large"
              src="https://www.t-stone.co.th/wp-content/uploads/2019/06/bg.jpg"
              alt="Buildings"
              width="700"
              height="394"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Promo;
