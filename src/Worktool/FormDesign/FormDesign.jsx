import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FormDesign.css';
import { FaEllipsisH } from 'react-icons/fa';
import QRCode from 'qrcode.react';
import * as XLSX from 'xlsx';

const FormDesign = () => {
  const [forms, setForms] = useState([]);
  const [tableData, setTableData] = useState([]); // State for table data
  const [showQR, setShowQR] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [uploadedData, setUploadedData] = useState([]);

  useEffect(() => {
    fetchForms();
    fetchTableData();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await axios.get('/v1/api/org/event');
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

  const handleGenerateQR = (form) => {
    setSelectedForm(form);
    setShowQR(true);
  };

  const handleCloseQR = () => {
    setShowQR(false);
    setSelectedForm(null);
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
      setUploadedData(data); // Store the uploaded data in the state
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmitXLSX = async () => {
    // Process the uploadedData and send it to the server
    try {
      await axios.post('/v1/api/org/uploaded-data', { data: uploadedData });
      // Optionally update the tableData with the uploaded data
      setTableData(uploadedData);
    } catch (error) {
      console.error('Error submitting uploaded data', error);
    }
  };

  const handleExportXLSX = () => {
    const ws = XLSX.utils.json_to_sheet(tableData); // Export the current table data
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "TableData");
    XLSX.writeFile(wb, "table_data.xlsx");
  };

  const handleCreateEvent = async (newEvent) => {
    try {
      const response = await axios.post('/v1/api/org/event', newEvent);
      fetchForms(); // Refresh the forms after creating a new event
    } catch (error) {
      console.error('Error creating event', error);
    }
  };

  const handleEditEvent = async (editedEvent) => {
    try {
      const response = await axios.put('/v1/api/org/event', editedEvent);
      fetchForms(); // Refresh the forms after editing an event
    } catch (error) {
      console.error('Error editing event', error);
    }
  };

  const handleUploadPicture = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('/v1/api/storage/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data; // Return the uploaded file data
    } catch (error) {
      console.error('Error uploading picture', error);
    }
  };

  const handleReadPicture = async (pictureId) => {
    try {
      const response = await axios.get(`/v1/api/storage/read?pictureId=${pictureId}`);
      return response.data; // Return the picture data
    } catch (error) {
      console.error('Error reading picture', error);
    }
  };

  return (
    <div className="form-design">
      <section className="create-new-form">
        <h2>Create new form</h2>
        <div className="form-icons">
          {forms.slice(0, 3).map((form, index) => (
            <div key={index} className="form-icon" onClick={() => handleGenerateQR(form)}>
              <img src={form.image} alt="Form" />
              <p>{form.title}</p>
            </div>
          ))}
          {forms.length > 3 && (
            <div className="form-icon" onClick={() => setShowMore(!showMore)}>
              <FaEllipsisH size={80} />
              <p>More Forms</p>
            </div>
          )}
        </div>
        {showMore && (
          <div className="more-forms">
            {forms.slice(3).map((form, index) => (
              <div key={index + 3} className="form-icon" onClick={() => handleGenerateQR(form)}>
                <img src={form.image} alt="Form" />
                <p>{form.title}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="your-current-form">
        <h2>Your current form for this event</h2>
        {forms.length > 0 && (
          <div className="current-form-content">
            <img src={forms[forms.length - 1].image} alt="Current Form" className="small-image" />
            <h3>{forms[forms.length - 1].title}</h3>
            <p>{forms[forms.length - 1].description}</p>
            <div className="form-buttons">
              <button className="generate-button" onClick={() => handleGenerateQR(forms[forms.length - 1])}>Generate QR</button>
            </div>
          </div>
        )}
      </section>

      <section className="form-table">
        <h2>Form Data Table</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.surname}</td>
                <td>{row.phone}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <input type="file" accept=".xlsx, .xls" onChange={handleImportXLSX} />
        <div>
          <button className="submit-button" onClick={handleSubmitXLSX}>Submit</button>
        </div>
        <br/>
        <br/>
        <br/>
        <div>
          <button className="export-button" onClick={handleExportXLSX}>Export XLSX</button>
        </div>
      </section>

      {showQR && selectedForm && (
        <div className="qr-popup">
          <div className="qr-popup-content">
            <QRCode value={JSON.stringify(selectedForm)} size={256} />
            <br/>
            <br/>
            <button onClick={handleCloseQR}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormDesign;
