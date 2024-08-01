import React, { useState, useEffect , useRef } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import './FormDesign.css';
import '../EventDashboard/DashBoard.css';
import { FaEllipsisH, FaCheck } from 'react-icons/fa';
import QRCode from 'qrcode.react';
import * as XLSX from 'xlsx';

const FormDesign = () => {
  const [forms, setForms] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [showQR, setShowQR] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [uploadedData, setUploadedData] = useState([]);
  const [eventName, setEventName] = useState('');
  const [bgImage, setBgImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [eventLink, setEventLink] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const rowsPerPage = 10;
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchForms();
    fetchTableData();
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      handleGenerateQR();
    }
  }, [selectedEvent]);

  const fetchForms = async () => {
    try {
      const orgId = sessionStorage.getItem('org_id') || 'null';
      const response = await axios.get(`https://event-worktools-api.vercel.app/v1/api/org/event`, { params: { org_id: orgId } });
      if (Array.isArray(response.data)) {
        setForms(response.data);
      } else {
        console.error('Error: Expected an array from API response');
      }
    } catch (error) {
      console.error('Error fetching forms', error);
    }
  };

  const fetchTableData = async () => {
    try {
      const response = await axios.get('/api/table-data'); // Change to your actual endpoint
      if (Array.isArray(response.data)) {
        setTableData(response.data);
      } else {
        console.error('Error: Expected an array from API response');
      }
    } catch (error) {
      console.error('Error fetching table data', error);
    }
  };

  const handleGenerateQR = () => {
    if (selectedEvent && selectedEvent.name) {
      const link = `http://localhost:5173/event?event_name=${selectedEvent.name}`;
      setEventLink(link);
      setQrCode(link);
    }
  };

  const handleExportXLSX = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "TableData");
    XLSX.writeFile(wb, "table_data.xlsx");
  };


  const fetchEvents = async () => {
    const orgId = sessionStorage.getItem('org_id') || 'abc123'; // default org_id if not in sessionStorage
    try {
      const response = await axios.get(`https://event-worktools-api.vercel.app/v1/api/org/event`, { params: { org_id: orgId } });
      const fetchedEvents = response.data;
      setEvents(fetchedEvents);
      if (fetchedEvents.length > 0) {
        const mainEvent = fetchedEvents[0];
        setSelectedEvent(mainEvent);
        sessionStorage.setItem('selectedEvent', JSON.stringify(mainEvent));
      }
    } catch (error) {
      console.error('Error fetching events', error);
    }
  };

  const handleEventChange = (event) => {
    const eventId = event.target.value;
    const selectedEvent = events.find(e => e.event_id === eventId);
    setSelectedEvent(selectedEvent);
    sessionStorage.setItem('selectedEvent', JSON.stringify(selectedEvent));
  };

  const handleDeleteData = () => {
    setUploadedData([]);
    setTableData([]);
    
    // Clear the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleImportXLSX = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
  
      // Get headers
      const headers = data[0].map(header => header.toLowerCase().replace(/ /g, '_'));
  
      // Filter out "event_name" column index
      const eventIndex = headers.indexOf('event_name');
      const filteredHeaders = headers.filter(header => header !== 'event_name');
  
      // Function to convert Excel date to JavaScript date
      const excelDateToJSDate = (serial) => {
        const utc_days = Math.floor(serial - 25569);
        const utc_value = utc_days * 86400;
        return new Date(utc_value * 1000);
      };
  
      // Filter data rows
      const filteredData = data.slice(1).map(row => {
        const filteredRow = { event_name: selectedEvent.name }; // Add event_name from selectedEvent
        row.forEach((cell, index) => {
          if (index !== eventIndex) {
            const header = filteredHeaders[index > eventIndex ? index - 1 : index];
            // Check if the cell is a number and possibly an Excel date
            if (typeof cell === 'number' && cell > 25569) {
              const date = excelDateToJSDate(cell);
              filteredRow[header] = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
            } else {
              filteredRow[header] = cell;
            }
          }
        });
        return filteredRow;
      });
  
      setUploadedData(filteredData);
      setTableData(filteredData);
      setCurrentPage(1);
    };
    reader.readAsBinaryString(file);
  };
  
  

  const handleSubmitXLSX = async () => {
    for (const row of uploadedData) {
      const rowDataWithEventName = { ...row, event_name: selectedEvent.name };
      try {
        await axios.post('https://event-worktools-api.vercel.app/v1/api/participant/public', rowDataWithEventName);
        setShowPopup(true);
        
      } catch (error) {
        console.error('Error submitting uploaded data', error);
      }

      setTimeout(() => {
        setShowPopup(false); 
        handleDeleteData();
      }, 10000);
    }
  };
  

  const displayData = tableData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="form-design">
      <button className="btn btn-primary mb-3" onClick={fetchEvents}>
        Refresh Events
      </button>
      <div className="mb-3">
        <select className="form-select" onChange={handleEventChange} value={selectedEvent?.event_id || ''}>
          {events.map(event => (
            <option key={event.event_id} value={event.event_id}>
              {event.name} 
            </option>
          ))}
        </select>
      </div>

      {selectedEvent && (
        <section className="form-table">
          <div>
            <h2>Event Form</h2>
            <div className="current-form-content">
              <div>
                <h1>Event name: {selectedEvent.name}</h1>
                <h2>Detail: {selectedEvent.detail}</h2>
                {eventLink && <h3>Event Link: <a href={eventLink}>{eventLink}</a></h3>}
              </div>
              <div className="qr-section">
                {qrCode && <QRCode value={qrCode} size={256} />}
              </div>
              <div className="form-buttons">
                <button className="generate-button btn btn-primary" onClick={handleGenerateQR}>
                  Generate QR
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="form-table">
        <h2>Form Data Table</h2>
        <table className="table">
          <thead>
            <tr>
              {Object.keys(displayData[0] || {}).map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, idx) => (
                  <td key={idx}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <input type="file" accept=".xlsx, .xls" onChange={handleImportXLSX} />
        <div>
          <button className="btn btn-primary mt-3" onClick={handleSubmitXLSX}>Submit</button>
          <button className="btn btn-danger mt-3" onClick={handleDeleteData}>Delete Data</button>
        </div>
        <div className="pagination">
          {Array.from({ length: Math.ceil(tableData.length / rowsPerPage) }, (_, index) => (
            <button
              key={index}
              className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        {showPopup && (
          <div className="popup11">
            <FaCheck className="success-icon" />
            <p> ลงทะเบียนสำเร็จ!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default FormDesign;
