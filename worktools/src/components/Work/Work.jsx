import React, { useEffect } from 'react';
import ModalImage from 'react-modal-image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Work.css'; // Import CSS file for custom styles

function Work() {
  const pics = {
    pic1: "https://www.t-stone.co.th/wp-content/uploads/2019/06/62214367_504696083402797_3663217893551636480_o-768x432.jpg",
    pic2: "https://www.t-stone.co.th/wp-content/uploads/2019/06/TME-Esport-2019_190613_0026-768x576.jpg",
    pic3: "https://www.t-stone.co.th/wp-content/uploads/2019/05/BookFair02-400x271.jpg",
    pic4: "https://www.t-stone.co.th/wp-content/uploads/2019/05/NescafeDG01-400x270.jpg",
    pic5: "https://www.t-stone.co.th/wp-content/uploads/2019/05/abbott02-400x270.jpg",
    pic6: "https://www.t-stone.co.th/wp-content/uploads/2019/05/SCB01-400x271.jpg",
    pic7: "https://www.t-stone.co.th/wp-content/uploads/2019/05/GSByearlymeeting03-400x270.jpg",
    pic8: "https://www.t-stone.co.th/wp-content/uploads/2019/05/KMUTNB004-400x270.jpg",
  };

  const images = Object.values(pics);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="work-container">
      <div className="w3-container" style={{ padding: "128px 16px" }} id="work">
        <h3 className="w3-center">OUR WORK</h3>
        <p className="w3-center w3-large">Main work</p>

        <div className="w3-row-padding" style={{ marginTop: "64px" }}>
          {images.slice(0, 4).map((pic, index) => (
            <div className="w3-col l3 m6" key={index} data-aos="fade-up">
              <ModalImage
                small={pic}
                large={pic}
                alt={`Work ${index + 1}`}
                className="modal-image"
              />
            </div>
          ))}
        </div>

        <div className="w3-row-padding w3-section">
          {images.slice(4).map((pic, index) => (
            <div className="w3-col l3 m6" key={index + 4} data-aos="fade-up">
              <ModalImage
                small={pic}
                large={pic}
                alt={`Work ${index + 5}`}
                className="modal-image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Work;
