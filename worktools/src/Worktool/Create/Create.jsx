import React, { useState } from 'react';
import { FcAddImage } from "react-icons/fc";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Create.css';

const Create = () => {
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventImage, setEventImage] = useState(null);
  const [eventDetail, setEventDetail] = useState('');
  const [eventType, setEventType] = useState('Public');
  const [imageURL, setImageURL] = useState('');
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) { // ตรวจสอบขนาดไฟล์ <= 2MB
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:3000/v1/api/storage/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setImageURL(response.data.fileLocation); // บันทึก URL ของไฟล์
        setEventImage(file); // อัปเดต eventImage เพื่อแสดงผล
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ:', error);
        alert('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ');
      }
    } else {
      alert('ขนาดไฟล์ควรน้อยกว่า 2MB');
    }
  };

  const handleImageRemove = () => {
    setEventImage(null);
    setImageURL(''); // ล้าง URL ของรูปภาพ
  };

  const handleSubmit = async () => {
    const formData = {
      name: eventName,
      location: eventLocation,
      detail: eventDetail,
      event_type: eventType,
      imageURL: imageURL, // รวม URL ของรูปภาพในข้อมูลเหตุการณ์
    };

    try {
      const response = await axios.post('http://localhost:3000/v1/api/org/event', formData);
      console.log(response.data);
      const eventId = response.data.id;
      navigate(`/eventdetail/${eventId}`);
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
          <span>อัปโหลด</span>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="form-control-file"
          />
        </label>
        {eventImage && (
          <div className="uploaded-file">
            <span>{eventImage.name}</span>
            <button onClick={handleImageRemove} className="remove-btn">ลบ</button>
          </div>
        )}
        <p>อัปโหลดภาพหัวข้อเหตุการณ์ (ขนาด 1200x630 พิกเซล, สูงสุด 2MB)</p>
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
            value="Private"
            checked={eventType === 'Private'}
            onChange={() => setEventType('Private')}
          />
          ส่วนตัว
        </label>
        <label>
          <input
            type="radio"
            value="Public"
            checked={eventType === 'Public'}
            onChange={() => setEventType('Public')}
          />
          สาธารณะ
        </label>
      </div>
      <button onClick={handleSubmit} className="submit-btn">ส่ง</button>
    </div>
  );
};

export default Create;
