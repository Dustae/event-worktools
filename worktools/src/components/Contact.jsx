import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Contact() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <div className="w3-container  " style={{ padding: "128px 16px" }} id="contact">
        <h3 className="w3-center" style={{ fontSize: "50px" }}>CONTACT US</h3>
        <p className="w3-center w3-large">Tell us about your project ideas or just say hello.</p>
        <div className="w3-content" style={{ marginTop: "48px" }}>
          <p data-aos="fade-up"><i className="fa fa-map-marker fa-fw w3-xxlarge w3-margin-right"></i> T-Stone Co., Ltd. 30 Prajadhipok 2 Alley, Wat Kanlaya, Thon Buri, Bangkok, Thailand 10600</p>
          <p data-aos="fade-up"><i className="fa fa-phone fa-fw w3-xxlarge w3-margin-right"></i> Phone: (+66)02-465-1671</p>
          <p data-aos="fade-up"><i className="fa fa-envelope fa-fw w3-xxlarge w3-margin-right"></i> Email: support@t-stone.co.th</p>
          <br />
          <img data-aos="fade-up" src="https://www.t-stone.co.th/wp-content/uploads/2019/06/bg.jpg" className="w3-image w3-greyscale" style={{ width: "100%", marginTop: "48px" }} />
        </div>
      </div>
     
    </div>
  );
}

export default Contact;
