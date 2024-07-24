import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Setting.css';

const Setting = () => {
  const [currentUsername, setCurrentUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    name: '',
    address: '',
    phoneNumber: '',
  });

  const navigate = useNavigate();

  const handleSaveLogin = async () => {
    try {
      const response = await axios.post('/api/update-login', {
        currentUsername,
        newUsername,
        currentPassword,
        newPassword,
      });
      console.log('Login credentials saved', response.data);
      // Handle success, e.g., show a success message or redirect
      // Example: navigate('/success'); // Redirect to a success page
    } catch (error) {
      console.error('Error updating login credentials', error);
      // Handle error, e.g., show an error message
    }
  };

  const handleSaveUserInfo = async () => {
    try {
      const response = await axios.post('/api/update-user-info', userInfo);
      console.log('User information saved', response.data);
      // Handle success, e.g., show a success message or redirect
      // Example: navigate('/profile'); // Redirect to a profile page
    } catch (error) {
      console.error('Error updating user information', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div className="container-settings mt-4">
      <h2>Settings</h2>
      <div className="card-settings mb-4">
        <div className="card-body">
          <h5 className="card-title09">Update Login Credentials</h5>
          <div className="mb-3">
            <label className="form-label09">Current Username</label>
            <input
              type="text"
              className="form-control09"
              value={currentUsername}
              onChange={(e) => setCurrentUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label09">New Username</label>
            <input
              type="text"
              className="form-control09"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label09">Current Password</label>
            <input
              type="password"
              className="form-control09"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label09">New Password</label>
            <input
              type="password"
              className="form-control09"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary-settings" onClick={handleSaveLogin}>
            Save
          </button>
        </div>
      </div>

      <div className="card-settings mb-4">
        <div className="card-body">
          <h5 className="card-title09">Registration Information</h5>
          <div className="mb-3">
            <label className="form-label09">Username</label>
            <input
              type="text"
              className="form-control09"
              value={userInfo.username}
              onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label09">Password</label>
            <input
              type="password"
              className="form-control09"
              value={userInfo.password}
              onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label09">Name</label>
            <input
              type="text"
              className="form-control09"
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label09">Address</label>
            <input
              type="text"
              className="form-control09"
              value={userInfo.address}
              onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label09">Phone Number</label>
            <input
              type="text"
              className="form-control09"
              value={userInfo.phoneNumber}
              onChange={(e) => setUserInfo({ ...userInfo, phoneNumber: e.target.value })}
            />
          </div>
          <button className="btn btn-primary-settings" onClick={handleSaveUserInfo}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
