import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Home.css"; 

const Home = () => {
  const toggleSidebar = () => {
    document.querySelector("#sidebar").classList.toggle("collapsed");
  };

  return (
    <div className="wrapper">
      <aside id="sidebar" className="js-sidebar">
        <div className="h-100">
          <div className="sidebar-logo">
            <a href="#">Homepage</a>
          </div>
          <ul className="sidebar-nav">
            <li className="sidebar-header">Detail</li>
            <li className="sidebar-item">
              <a href="#" className="sidebar-link">
                <i className="fa-solid fa-list pe-2"></i>
                Dashboard
              </a>
            </li>
            <li className="sidebar-item">
              <a
                href="#"
                className="sidebar-link collapsed"
                data-bs-target="#pages"
                data-bs-toggle="collapse"
                aria-expanded="false"
              >
                <i className="fa-solid fa-file-lines pe-2"></i>
                Create Event
              </a>
              <ul
                id="pages"
                className="sidebar-dropdown list-unstyled collapse"
                data-bs-parent="#sidebar"
              >
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Page 1</a>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Page 2</a>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <a
                href="#"
                className="sidebar-link collapsed"
                data-bs-target="#posts"
                data-bs-toggle="collapse"
                aria-expanded="false"
              >
                <i className="fa-solid fa-sliders pe-2"></i>
                Event Management
              </a>
              <ul
                id="posts"
                className="sidebar-dropdown list-unstyled collapse"
                data-bs-parent="#sidebar"
              >
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Event Analytic</a>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Event Detail</a>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Event Information</a>
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
                <a href="#" data-bs-toggle="dropdown" className="nav-icon pe-md-0">
                  <img
                    src="image/profile.jpg"
                    className="avatar img-fluid rounded"
                    alt=""
                  />
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a href="#" className="dropdown-item">Profile</a>
                  <a href="#" className="dropdown-item">Setting</a>
                  <a href="#" className="dropdown-item">Logout</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <main className="content px-3 py-2">
          <div className="container-fluid">
            <div className="mb-3">
              <h4>Dashboard</h4>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 d-flex">
                <div className="card flex-fill border-0 illustration">
                  <div className="card-body p-0 d-flex flex-fill">
                    <div className="row g-0 w-100">
                      <div className="col-6">
                        <div className="p-3 m-1">
                          <h4>Welcome Back, Admin</h4>
                          <p className="mb-0">Admin Dashboard, CodzSword</p>
                        </div>
                      </div>
                      <div className="col-6 align-self-end text-end">
                        <img
                          src="image/customer-support.jpg"
                          className="img-fluid illustration-img"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 d-flex">
                <div className="card flex-fill border-0">
                  <div className="card-body py-4">
                    <div className="d-flex align-items-start">
                      <div className="flex-grow-1">
                        <h4 className="mb-2">$ 78.00</h4>
                        <p className="mb-2">Total Earnings</p>
                        <div className="mb-0">
                          <span className="badge text-success me-2"> +9.0% </span>
                          <span className="text-muted"> Since Last Month </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card border-0">
              <div className="card-header">
                <h5 className="card-title">Table</h5>
                <h6 className="card-subtitle text-muted">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatum ducimus, necessitatibus reprehenderit itaque!
                </h6>
              </div>
            </div>
          </div>
        </main>
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
                    <a href="#" className="text-muted">Contact</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="text-muted">About Us</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="text-muted">Plans and Pricing</a>
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

export default Home;
