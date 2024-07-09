import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import RegisterBooth from './booth/RegisterBooth';
import LoginBooth from './booth/LoginBooth';
import ConfirmBooth from './booth/ConfirmBooth';
import SuccessBooth from './booth/SuccessBooth';
import CheckIn from './Worktool/CheckIn';
import Register from './Worktool/Register';
import Page404 from './Worktool/Page404';
import Navbar from './components/Navbar';
import Header from './components/Header';
import About from './components/About';
import Promo from './components/Promo';
import Team from './components/Team';
import Statistics from './components/Statistics';
import Work from './components/Work';
import Skill from './components/Skill';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomerLayout from './components/CustomerLayout';


import './App.css';

const App = () => {
  const location = useLocation();
  const showNavbar = !['/registerbooth', '/loginbooth', '/confirmbooth', '/successbooth', '/checkin', '/register', '*'].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/promo" element={<Promo />} />
        <Route path="/team" element={<Team />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/work" element={<Work />} />
        <Route path="/skill" element={<Skill />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/footer" element={<Footer />} />
 
        {/* Customer routes */}
        <Route element={<CustomerLayout />}>
          <Route path="/registerbooth" element={<RegisterBooth />} />
          <Route path="/loginbooth" element={<LoginBooth />} />
          <Route path="/confirmbooth" element={<ConfirmBooth />} />
          <Route path="/successbooth" element={<SuccessBooth />} />
        </Route>
        {/* Page not found route */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default App;

