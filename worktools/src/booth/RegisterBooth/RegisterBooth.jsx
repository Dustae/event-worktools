import React, { useState, useEffect } from 'react';
import { FaUser, FaCheckCircle , FaCheck} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterBooth.css';
import EventDetail from '../../Worktool/EventDashboard/EventDetail';

const RegisterBooth = () => {
  const [bannerUrl, setBannerUrl] = useState('');
  const [bgUrl, setBgUrl] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
  });
  const [optionalFields, setOptionalFields] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the banner and background filenames from session storage
    const eventData = JSON.parse(sessionStorage.getItem('eventData')) || {};
    const bannerFilename = eventData.banner || '';
    const bgFilename = eventData.bg || '';

    // Fetch the banner and background image URLs from the API
    const fetchImages = async () => {
      try {
        const bannerResponse = await axios.get(`https://event-worktools-api.vercel.app/v1/api/storage/read?filename=${bannerFilename}`);
        const bgResponse = await axios.get(`https://event-worktools-api.vercel.app/v1/api/storage/read?filename=${bgFilename}`);
        setBannerUrl(bannerResponse.data);
        setBgUrl(bgResponse.data);
      } catch (error) {
        console.error('Error fetching image URLs:', error);
      }
    };

    fetchImages();

    try {
      const options = [];
      for (let i = 1; i <= 10; i++) {
        const optionValue = eventData[`option${i}`] || '';
        if (optionValue.trim() !== '') {
          options.push({
            name: `option${i}`,
            value: optionValue.trim(),
          });
        }
      }
      setOptionalFields(options);
    } catch (error) {
      console.error('Error parsing event data:', error);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    
    const eventData = JSON.parse(sessionStorage.getItem('eventData')) || {};
  
    // Build the requestData object
    const requestData = {
      event_name: eventData.name, 
      name: formData.firstName,
      surname: formData.lastName,
      email: formData.email,
      phone: formData.phoneNumber,
    };
  
    // Add optional fields to requestData if they have values
    optionalFields.forEach((field) => {
      if (formData[field.name]) {
        requestData[field.value] = formData[field.name];
      }
    });
  
    try {
      const response = await axios.post('https://event-worktools-api.vercel.app/v1/api/participant/public', requestData);
      console.log(response.data);
      setShowPopup(true); // Show the popup icon
    } catch (error) {
      console.error('Error registering user:', error);
    }
  
    setTimeout(() => {
      setShowPopup(false); // Hide the popup icon after 1 second
      // navigate('/successbooth'); // Navigate to the success page after registration
    }, 5000);
  };
  

  return (
    <div className="body11" style={{ backgroundImage: `url(${bgUrl})` }}>
      <div className="wrapper11">
        {bannerUrl && <img src={bannerUrl} alt="Banner" className="bannerImage" />}
        {/* <FaUser className="icon11" /> */}
        <form onSubmit={handleRegister}>
          <h1>ลงทะเบียนเข้าร่วมงาน</h1>
          <div className="input-box11">
            <input type="text" placeholder="ชื่อ" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="input-box11">
            <input type="text" placeholder="นามสกุล" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div className="input-box11">
            <input type="text" placeholder="เบอร์โทรศัพท์" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          </div>
          <div className="input-box11">
            <input type="email" placeholder="อีเมล" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          {optionalFields.map((field, index) => (
            <div className="input-box11" key={index}>
              <input type="text" placeholder={field.value} name={field.name} onChange={handleChange} />
            </div>
          ))}
          <button type="submit">ลงทะเบียน</button>
          {/* <div className="register-link11">
            <p>Already have an account? <Link to="/loginbooth">Login</Link></p>
          </div> */}
        </form>
        {showPopup && (
          <div className="popup11">
            <FaCheck className="success-icon" />
            <p> ลงทะเบียนสำเร็จ!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterBooth;
