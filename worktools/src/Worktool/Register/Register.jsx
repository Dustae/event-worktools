import React from 'react';
import { FaUserCog } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import axios from 'axios';
import './Register.css';

const Register = () => {

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    const org_name = event.target.elements.name.value; // Map to org_name
    const org_address = event.target.elements.address.value; // Map to org_address
    const org_phone = event.target.elements.phoneNumber.value; // Map to org_phone
    const contact_person = event.target.elements.contactPerson.value; // New field for contact person

    try {
      const response = await axios.post('https://event-worktools-api.vercel.app/v1/api/org/register', {
        username,
        password,
        org_name,
        org_address,
        org_phone,
        contact_person
      });

      if (response.data.message === "register account success") {
        alert("Registration successful!");
        window.location.href = "/checkin";
      } else {
        alert("Registration failed: " + response.data.message);
      }
    } catch (error) {
      console.error('There was an error!', error);
      alert("Registration failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="body89">
      <Link to="/" className="back-link2">
        <IoMdArrowBack className="back-icon2" />
      </Link>
      <div className="wrapper89">
        <FaUserCog className='icon1' />
        <form onSubmit={handleSubmit}>
          <h1>Register Exhibitor</h1>
          <div className="input-box89">
            <input type="text" name="username" placeholder="Username" required />
          </div>
          <div className="input-box89">
            <input type="password" name="password" placeholder="Password" required />
          </div>
          <div className="input-box89">
            <input type="text" name="name" placeholder="Organization Name" required /> {/* Update placeholder */}
          </div>
          <div className="input-box89">
            <input type="text" name="address" placeholder="Address" required />
          </div>
          <div className="input-box89">
            <input type="tel" name="phoneNumber" placeholder="Phone Number" required />
          </div>
          <div className="input-box89">
            <input type="text" name="contactPerson" placeholder="Contact Person" required /> {/* New input field */}
          </div>
          <button type="submit">Register</button>
          <div className="register-link89">
            <p>Already have an account? <Link to="/checkin">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
