import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import html2canvas from 'html2canvas';
import './DataTable.css';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 100;
  const tableRef = useRef();

  const fetchData = async () => {
    try {
      const response = await axios.get('your-api-endpoint');
      const responseData = response.data;

      // Ensure responseData is an array
      if (Array.isArray(responseData)) {
        setData(responseData);
      } else {
        console.error('Unexpected data format:', responseData);
      }
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const exportPDF = async () => {
    const input = tableRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    pdf.save("data-table.pdf");
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const currentData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="data-table-container">
      <h1>Data Table</h1>
      <div ref={tableRef}>
        <table className="data-table" id="table-to-export">
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.surname}</td>
                <td>{row.email}</td>
                <td>{row.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="footer">
        <p>Total count: {data.length}</p>
        <button onClick={exportPDF} className="export-button">Save as PDF</button>
        <div className="pagination">
          {Array.from({ length: Math.ceil(data.length / rowsPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={currentPage === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
