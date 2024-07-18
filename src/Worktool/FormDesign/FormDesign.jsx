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

  useEffect(() => {
    fetchForms();
    fetchTableData();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await axios.get('/api/forms');
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
      console.log(data);
      // Process data and update table state
    };
    reader.readAsBinaryString(file);
  };

  const handleExportXLSX = () => {
    const ws = XLSX.utils.json_to_sheet(forms);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Forms");
    XLSX.writeFile(wb, "forms.xlsx");
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
        <button className="import-button" onClick={handleExportXLSX}>Export XLSX</button>
      </section>

      {showQR && selectedForm && (
        <div className="qr-popup">
          <div className="qr-popup-content">
            <QRCode value={JSON.stringify(selectedForm)} size={256} />
            <br/>
            <button onClick={handleCloseQR}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormDesign;
