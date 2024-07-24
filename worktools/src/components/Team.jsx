import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


function Team() {
  const teamPics = {
    firstPerson: "https://www.t-stone.co.th/wp-content/uploads/2019/06/bg.jpg",
    secondPerson: "https://www.t-stone.co.th/wp-content/uploads/2019/06/bg.jpg",
    thirdPerson: "https://www.t-stone.co.th/wp-content/uploads/2019/06/bg.jpg",
    fourthPerson: "https://www.t-stone.co.th/wp-content/uploads/2019/06/bg.jpg",
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <div className="w3-container" style={{ padding: "128px 16px" }} id="team">
        <h3 className="w3-center" style={{ fontSize: "50px" }}>The TEAM</h3>
        <p className="w3-center w3-large">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod<br />
          tempor incididunt ut labore et dolore.
        </p>
        <div className="w3-row-padding w3-grayscale" style={{ marginTop: "64px" }}>
          <div className="w3-col l3 m6 w3-margin-bottom" data-aos="fade-up">
            <div className="w3-card">
              <img src={teamPics.firstPerson} alt="John" style={{ width: "100%" }} />
              <div className="w3-container">
                <h3>Codename61</h3>
                <p className="w3-opacity">CEO & Founder</p>
                <p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p>
              </div>
            </div>
          </div>
          <div className="w3-col l3 m6 w3-margin-bottom" data-aos="fade-up" data-aos-delay="100">
            <div className="w3-card">
              <img src={teamPics.secondPerson} alt="Jane" style={{ width: "100%" }} />
              <div className="w3-container">
                <h3>Codename64</h3>
                <p className="w3-opacity">Art Director</p>
                <p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p>
              </div>
            </div>
          </div>
          <div className="w3-col l3 m6 w3-margin-bottom" data-aos="fade-up" data-aos-delay="200">
            <div className="w3-card">
              <img src={teamPics.thirdPerson} alt="Mike" style={{ width: "100%" }} />
              <div className="w3-container">
                <h3>Codename66</h3>
                <p className="w3-opacity">Web Designer</p>
                <p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p>
              </div>
            </div>
          </div>
          <div className="w3-col l3 m6 w3-margin-bottom" data-aos="fade-up" data-aos-delay="300">
            <div className="w3-card">
              <img src={teamPics.fourthPerson} alt="Dan" style={{ width: "100%" }} />
              <div className="w3-container">
                <h3>Codename69</h3>
                <p className="w3-opacity">Designer</p>
                <p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Team;
