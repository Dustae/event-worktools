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

  const fetchData = async () => {
    try {
      const response = await axios.get('your-api-endpoint');
      const responseData = response.data;
  
      // Ensure that responseData has the expected structure
      if (responseData && responseData.labels) {
        // Proceed with setting the data
        setBarData(responseData);
      } else {
        console.error('Unexpected data format:', responseData);
      }
    } catch (error) {
      console.error('Error fetching data', error);
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
