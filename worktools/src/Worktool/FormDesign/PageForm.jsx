import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { HiUserCircle } from "react-icons/hi2";
import "./PageForm.css";
import FormDesign from "./FormDesign";

const PageForm = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({ pages: false, posts: false, user: false });
  const contentRef = useRef();

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
                  <a href="/dashboard" className="sidebar-link">Event Analytic</a>
                </li>
                <li className="sidebar-item">
                  <a href="/dashboard" className="sidebar-link">Event Detail</a>
                </li>
                <li className="sidebar-item">
                  <a href="/dashboard" className="sidebar-link">Event Information</a>
                </li>
                <li className="sidebar-item">
                  <a href="/formdesign" className="sidebar-link">Form Design</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>
          
      <div className="main" ref={contentRef}>
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
                  <a href="/pagesetting" className="dropdown-item">Profile</a>
                  <a href="/pagesetting" className="dropdown-item">Setting</a>
                  <a href="/" className="dropdown-item">Logout</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
            <FormDesign/>
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

export default PageForm;
