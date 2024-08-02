import React, { useState } from 'react';
import { FcAddImage } from "react-icons/fc";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Create.css';

const Create = () => {
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventBG, setEventBG] = useState(null);
  const [eventBanner, setEventBanner] = useState(null);
  const [eventDetail, setEventDetail] = useState('');
  const [eventType, setEventType] = useState('Public');
  const [optionalFields, setOptionalFields] = useState(Array(10).fill(''));
  const [showOptionalField, setShowOptionalField] = useState(1);
  const navigate = useNavigate();

  const handleImageUpload = (e, setImage) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) { // ตรวจสอบขนาดไฟล์ <= 2MB
      setImage(file); // อัปเดตภาพเพื่อแสดงผล
    } else {
      alert('ขนาดไฟล์ควรน้อยกว่า 2MB');
    }
  };

  const handleImageRemove = (setImage) => {
    setImage(null);
  };

  const handleOptionalFieldChange = (index, value) => {
    const newOptionalFields = [...optionalFields];
    newOptionalFields[index] = value;
    setOptionalFields(newOptionalFields);
    if (index === showOptionalField - 1 && value) {
      setShowOptionalField(showOptionalField + 1);
    }
  };

  const handleSubmit = async () => {
    const storedOrgId = sessionStorage.getItem('org_id');
    const formatOptionalFields = (fields) => fields.map(field => field.trim() === '' ? ' ' : field);

    const formData = new FormData();
    formData.append('name', eventName);
    formData.append('location', eventLocation);
    formData.append('detail', eventDetail);
    formData.append('event_type', eventType);
    formData.append('org_id', storedOrgId);

    // Append optional fields
    formatOptionalFields(optionalFields).forEach((field, index) => {
      formData.append(`option${index + 1}`, field);
    });

    // Append image files if they exist
    if (eventBG) {
      formData.append('bg', eventBG);
    }
    if (eventBanner) {
      formData.append('banner', eventBanner);
    }

    try {
      const response = await axios.post('https://event-worktools-api.vercel.app/v1/api/org/event', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      alert('สร้างเหตุการณ์สำเร็จ');
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการสร้างเหตุการณ์!', error);
      alert('เกิดข้อผิดพลาดในการสร้างเหตุการณ์');
    }
  };

  return (
    <div className="event-registration-form">
      <h2>สร้างเหตุการณ์</h2>
      <input 
        type="text" 
        placeholder="ชื่อเหตุการณ์" 
        value={eventName} 
        onChange={(e) => setEventName(e.target.value)} 
        className="form-control"
      />
      <input 
        type="text" 
        placeholder="สถานที่จัดงาน" 
        value={eventLocation} 
        onChange={(e) => setEventLocation(e.target.value)}  
        className="form-control"
      />
      <div className="image-upload">
        <label className="file-label">
          <FcAddImage className="icon" />
          <span>อัปโหลดภาพพื้นหลัง</span>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => handleImageUpload(e, setEventBG)} 
            className="form-control-file"
          />
        </label>
        {eventBG && (
          <div className="uploaded-file">
            <span>{eventBG.name}</span>
            <button onClick={() => handleImageRemove(setEventBG)} className="remove-btn">ลบ</button>
          </div>
        )}
        <p>อัปโหลดภาพพื้นหลังของเหตุการณ์ (ขนาด 1200x630 พิกเซล, สูงสุด 2MB)</p>
      </div>
      <div className="image-upload">
        <label className="file-label">
          <FcAddImage className="icon" />
          <span>อัปโหลดแบนเนอร์</span>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => handleImageUpload(e, setEventBanner)} 
            className="form-control-file"
          />
        </label>
        {eventBanner && (
          <div className="uploaded-file">
            <span>{eventBanner.name}</span>
            <button onClick={() => handleImageRemove(setEventBanner)} className="remove-btn">ลบ</button>
          </div>
        )}
        <p>อัปโหลดแบนเนอร์ของเหตุการณ์ (ขนาด 1200x630 พิกเซล, สูงสุด 2MB)</p>
      </div>
      <textarea
        placeholder="รายละเอียดเหตุการณ์"
        value={eventDetail}
        onChange={(e) => setEventDetail(e.target.value)}
        className="form-control"
      ></textarea>
      <div className="radio-container">
        <label>
          <input
            type="radio"
            value="private"
            checked={eventType === 'private'}
            onChange={() => setEventType('private')}
          />
          ส่วนตัว
        </label>
        <label>
          <input
            type="radio"
            value="public"
            checked={eventType === 'public'}
            onChange={() => setEventType('public')}
          />
          สาธารณะ
        </label>
      </div>
      {Array.from({ length: 10 }, (_, index) => (
        index < showOptionalField && (
          <textarea
            key={index}
            placeholder={`เพิ่มฟิลด์เสริม ${index + 1}`}
            value={optionalFields[index]}
            onChange={(e) => handleOptionalFieldChange(index, e.target.value)}
            className="form-control"
          ></textarea>
        )
      ))}
      <button onClick={handleSubmit} className="submit-btn">ส่ง</button>
    </div>
  );
};

export default Create;
