import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Summary.css';
import { FaRegCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Summary = () => {
  const [timeframe, setTimeframe] = useState('month');
  const [startDate, setStartDate] = useState(new Date());
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [lineData, setLineData] = useState({
    day: { labels: [], datasets: [] },
    month: { labels: [], datasets: [] },
    year: { labels: [], datasets: [] },
  });

  useEffect(() => {
    fetchLineData();
    fetchTasks();
  }, []);

  const fetchLineData = async () => {
    try {
      const response = await axios.get('/api/line-data'); // Adjust endpoint
      const data = response.data;

      // Ensure the response has the expected structure
      if (data && data.day && data.month && data.year) {
        setLineData(data);
      } else {
        console.error('Unexpected line data structure', data);
      }
    } catch (error) {
      console.error('Error fetching line data', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks'); // Adjust endpoint
      const data = response.data;

      // Ensure the response is an array
      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        console.error('Tasks API did not return an array', data);
      }
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  const handleAddTask = async () => {
    if (task.trim() !== '') {
      const newTask = { title: task, date: startDate };
      try {
        const response = await axios.post('/api/tasks', newTask); // Adjust endpoint
        const data = response.data;

        // Ensure the response is either an array or a single task object
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          setTasks((prevTasks) => [...prevTasks, data]);
        }
        setTask('');
      } catch (error) {
        console.error('Error adding task', error);
      }
    }
  };

  return (
    <div className="container mt-4">
      {/* Existing summary content */}
      <div className="row mb-4">
        <div className="col">
          <div className="card gradient-card gradient1 text-white">
            <div className="card-body">
              <h5 className="card-title">26K (-12.4%)</h5>
              <p className="card-text">Users</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card gradient-card gradient2 text-white">
            <div className="card-body">
              <h5 className="card-title">$6.200 (40.9%)</h5>
              <p className="card-text">Income</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card gradient-card gradient3 text-white">
            <div className="card-body">
              <h5 className="card-title">2.49% (84.7%)</h5>
              <p className="card-text">Conversion Rate</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card gradient-card gradient4 text-white">
            <div className="card-body">
              <h5 className="card-title">44K (-23.6%)</h5>
              <p className="card-text">Sessions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4 bg-light">
        <div className="card-body">
          <h5 className="card-title">Traffic</h5>
          <p className="card-text">January - July 2023</p>
          <div className="line-chart-container">
            <div className="btn-group mb-3" role="group" aria-label="Basic example">
              <button
                type="button"
                className={`btn ${timeframe === 'day' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setTimeframe('day')}
              >
                Day
              </button>
              <button
                type="button"
                className={`btn ${timeframe === 'month' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setTimeframe('month')}
              >
                Month
              </button>
              <button
                type="button"
                className={`btn ${timeframe === 'year' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setTimeframe('year')}
              >
                Year
              </button>
            </div>
            <FaRegCalendarAlt className="calendar-icon" />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              className="datepicker"
            />
            {lineData[timeframe] && lineData[timeframe].labels.length > 0 ? (
              <Line data={lineData[timeframe]} />
            ) : (
              <p>No data available for the selected timeframe.</p>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="card gradient-card gradient5 text-white">
            <div className="card-body">
              <h5 className="card-title">Visits</h5>
              <p className="card-text">29,703 Users (40%)</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card gradient-card gradient1 text-white">
            <div className="card-body">
              <h5 className="card-title">Unique</h5>
              <p className="card-text">24,093 Users (20%)</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card gradient-card gradient2 text-white">
            <div className="card-body">
              <h5 className="card-title">Pageviews</h5>
              <p className="card-text">78,706 Views (60%)</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card gradient-card gradient3 text-white">
            <div className="card-body">
              <h5 className="card-title">New Users</h5>
              <p className="card-text">22,123 Users (80%)</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card gradient-card gradient4 text-white">
            <div className="card-body">
              <h5 className="card-title">Bounce Rate</h5>
              <p className="card-text">Average Rate (40.15%)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Table of Contacts</h5>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card mb-4 bg-light">
        <div className="card-body">
          <h5 className="card-title">Add Task</h5>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleAddTask}>
                Add
              </button>
            </div>
          </div>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            className="form-control"
          />
        </div>
      </div>

      <div className="card mb-4 bg-light">
        <div className="card-body">
          <h5 className="card-title">Calendar</h5>
          <Calendar
            localizer={localizer}
            events={tasks.map(task => ({
              title: task.title,
              start: new Date(task.date),
              end: new Date(task.date),
            }))}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Summary;
