import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { HiUserCircle } from "react-icons/hi2";
import EventAnalytic from "./EventAnalytic";
import EventDetail from "./EventDetail";
import DataTable from "./DataTable";
import "./DashBoard.css";

const DashBoard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({ pages: false, posts: false, user: false });
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventAnalyticData, setEventAnalyticData] = useState(null);
  const [eventDetailData, setEventDetailData] = useState(null);
  const [dataTableData, setDataTableData] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const orgId = sessionStorage.getItem('org_id') || 'abc123'; // default org_id if not in sessionStorage
    try {
      const response = await axios.get(`https://event-worktools-api.vercel.app/v1/api/org/event`, { params: { org_id: orgId } });
      const fetchedEvents = response.data;
      setEvents(fetchedEvents);
      if (fetchedEvents.length > 0) {
        const mainEvent = fetchedEvents[0];
        setSelectedEvent(mainEvent);
        fetchEventAnalytic(mainEvent.event_id);
        fetchEventDetail(mainEvent.event_id);
        fetchDataTable(mainEvent.event_id);
      }
      setLoading(false); // Set loading to false after fetching
    } catch (error) {
      console.error('Error fetching events', error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  const fetchEventAnalytic = async (eventId) => {
    try {
      const response = await axios.get('/v1/api/org/event/analytic', { params: { event_id: eventId } });
      setEventAnalyticData(response.data);
    } catch (error) {
      console.error('Error fetching event analytic data', error);
    }
  };

  const fetchEventDetail = async (eventId) => {
    try {
      const response = await axios.get('/v1/api/org/event/detail', { params: { event_id: eventId } });
      setEventDetailData(response.data);
    } catch (error) {
      console.error('Error fetching event detail data', error);
    }
  };

  const fetchDataTable = async (eventId) => {
    try {
      const response = await axios.get('/v1/api/org/event/table', { params: { event_id: eventId } });
      setDataTableData(response.data);
    } catch (error) {
      console.error('Error fetching data table data', error);
    }
  };

  const handleEventChange = (event) => {
    const eventId = event.target.value;
    console.log('Selected Event ID:', eventId);
    setSelectedEvent(eventId);
    fetchEventAnalytic(eventId);
    fetchEventDetail(eventId);
    fetchDataTable(eventId);

    // Update sessionStorage with new event details
    const selectedEvent = events.find(e => e.event_id === eventId);
    sessionStorage.setItem('selectedEvent', JSON.stringify(selectedEvent));
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleDropdown = (dropdown) => {
    setDropdownOpen({ ...dropdownOpen, [dropdown]: !dropdownOpen[dropdown] });
  };

  return (
    <div className="wrapper52">
      <aside id="sidebar" className={`js-sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="h-100">
          <div className="sidebar-logo">
            <a href="/home">Homepage</a>
          </div>
          <ul className="sidebar-nav">
            <li className="sidebar-header">Detail</li>
            <li className="sidebar-item">
              <a href="/pagecreate" className="sidebar-link" onClick={() => toggleDropdown("pages")}>
                <i className="fa-solid fa-file-lines pe-2"></i>
                Create Event
              </a>
            </li>
            <li className="sidebar-item">
              <a href="#" className="sidebar-link" onClick={() => toggleDropdown("posts")}>
                <i className="fa-solid fa-sliders pe-2"></i>
                Event Management
              </a>
              <ul id="posts" className={`sidebar-dropdown list-unstyled collapse ${dropdownOpen.posts ? "show" : ""}`}>
                <li className="sidebar-item">
                  <a href="#event-analytic" className="sidebar-link">Event Analytic</a>
                </li>
                <li className="sidebar-item">
                  <a href="#event-detail" className="sidebar-link">Event Detail</a>
                </li>
                <li className="sidebar-item">
                  <a href="#data-table" className="sidebar-link">Event Information</a>
                </li>
                <li className="sidebar-item">
                  <a href="/PageForm" className="sidebar-link">Form Design</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>

      <div className="main">
        <nav className="navbar navbar-expand px-3 border-bottom">
          <button className="btn" id="sidebar-toggle" type="button" onClick={toggleSidebar}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse navbar">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  href="#"
                  data-bs-toggle="dropdown"
                  className="nav-icon pe-md-0"
                  onClick={() => toggleDropdown("user")}
                >
                  <HiUserCircle className="fa-circle-user custom-icon-size" />
                </a>
                <div className={`dropdown-menu dropdown-menu-end ${dropdownOpen.user ? "show" : ""}`}>
                  <a href="#" className="dropdown-item">Profile</a>
                  <a href="#" className="dropdown-item">Setting</a>
                  <a href="#" className="dropdown-item">Logout</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <button className="btn btn-primary mb-3" onClick={() => fetchEvents()}>
            Refresh Events
          </button>
          <div className="mb-3">
          <select className="form-select" onChange={handleEventChange} value={selectedEvent}>
          {events.map(event => (
            <option key={event.event_id} value={event.event_id}>
              {event.name} 
            </option>
          ))}
        </select>
          </div>
         
          <div id="event-analytic">
            {loading ? <p>Loading Event Analytic...</p> : <EventAnalytic data={eventAnalyticData} />}
          </div>
          <div id="event-detail">
            {loading ? <p>Loading Event Detail...</p> : <EventDetail data={eventDetailData} />}
          </div>
          <div id="data-table">
            {loading ? <p>Loading Data Table...</p> : <DataTable data={dataTableData} />}
          </div>
        </div>
        <main className="content px-3 py-2"></main>
        <footer className="footer">
          <div className="container-fluid">
            <div className="row text-muted">
              <div className="col-6 text-start">
                <p className="mb-0">
                  <a href="#" className="text-muted">
                    <strong>T-Stone</strong>
                  </a>
                </p>
              </div>
              <div className="col-6 text-end">
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <a href="/contact" className="text-muted">Contact</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="/about" className="text-muted">About Us</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="/pricing" className="text-muted">Plans and Pricing</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashBoard;
