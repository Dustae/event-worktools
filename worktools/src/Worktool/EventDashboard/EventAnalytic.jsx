import React, { useState, useEffect } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { FaRegCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import './EventAnalytic.css';

ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const EventAnalytic = () => {
  const [timeframe, setTimeframe] = useState('month');
  const [startDate, setStartDate] = useState(new Date());
  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [],
  });
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [],
  });
  const [lineData, setLineData] = useState({
    labels: [],
    datasets: [],
  });

  const orgId = 'abc123'; // แทนที่ด้วย ID ขององค์กรจริง

  const fetchData = async () => {
    try {
      const response = await axios.get('your-api-endpoint/v1/api/org/event', {
        params: {
          org_id: orgId,
        },
      });
      const responseData = response.data;
  
      // ตรวจสอบว่า responseData มีโครงสร้างที่คาดหวัง
      if (responseData && responseData.labels) {
        // ตั้งค่าข้อมูลสำหรับแต่ละกราฟ
        setPieData({
          labels: responseData.pie.labels,
          datasets: responseData.pie.datasets,
        });
        setBarData({
          labels: responseData.bar.labels,
          datasets: responseData.bar.datasets,
        });
        setLineData({
          labels: responseData.line.labels,
          datasets: responseData.line.datasets,
        });
      } else {
        console.error('โครงสร้างข้อมูลไม่คาดหวัง:', responseData);
      }
    } catch (error) {
      console.error('ข้อผิดพลาดในการดึงข้อมูล', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [timeframe, startDate]);

  return (
    <div className="event-analytic">
      <h2>Event Analytics</h2>
      <div className="chart-container">
        <Pie data={pieData} />
        <Bar data={barData} />
      </div>
      <div className="line-chart-container">
        <div className="btn-group mb-3" role="group" aria-label="Basic example">
          <button type="button" className={`btn ${timeframe === 'day' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTimeframe('day')}>Day</button>
          <button type="button" className={`btn ${timeframe === 'month' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTimeframe('month')}>Month</button>
          <button type="button" className={`btn ${timeframe === 'year' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTimeframe('year')}>Year</button>
        </div>
        <FaRegCalendarAlt className="calendar-icon" />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="dd/MM/yyyy"
          className="datepicker"
        />
        <Line data={lineData} />
      </div>
    </div>
  );
};

export default EventAnalytic;
