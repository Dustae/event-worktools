import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import RegisterBooth from './booth/RegisterBooth/RegisterBooth';
import LoginBooth from './booth/LoginBooth/LoginBooth';
import ConfirmBooth from './booth/ConfirmBooth/ConfirmBooth';
import SuccessBooth from './booth/SuccesBooth/SuccessBooth';
import CheckIn from './Worktool/Checkin/CheckIn';
import Register from './Worktool/Register/Register';
import Page404 from './Worktool/Page404/Page404';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import About from './components/About';
import Promo from './components/Promo';
import Team from './components/Team';
import Statistics from './components/Statistics';
import Work from './components/Work/Work';
import Skill from './components/Skill';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomerLayout from './components/CustomerLayout';
import WorktoolLayout from './components/WorktoolLayout';
import Home from './Worktool/HomeDashboard/Home';
import Create from './Worktool/Create/Create';
import EventAnalytic from './Worktool/EventDashboard/EventAnalytic';
import EventDetail from './Worktool/EventDashboard/EventDetail';
import DataTable from './Worktool/EventDashboard/DataTable';
import './App.css';
import FormDesign from './Worktool/FormDesign/FormDesign';
import PageCreate from './Worktool/Create/PageCreate';
import DashBoard from './Worktool/EventDashboard/DashBoard';
import Summary from './Worktool/HomeDashboard/Summary';
import PageForm from './Worktool/FormDesign/PageForm';
import Setting from './Worktool/SettingProfile/Setting';
import PageSetting from './Worktool/SettingProfile/PageSetting';
import SuccessRegister from './booth/SuccesBooth/SuccessRegister';
import EventBooth from './booth/eventBooth/EventBooth';

const App = () => {
  const location = useLocation();

  const knownPaths = [
    '/',
    '/checkin',
    '/register',
    '/about',
    '/promo',
    '/team',
    '/statistics',
    '/work',
    '/skill',
    '/pricing',
    '/contact',
    '/footer',
  ];

  const showNavbar = knownPaths.includes(location.pathname);

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
        
        <Route element={<WorktoolLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/homecreate" element={<Create />} />
          <Route path="/eventanalytic" element={<EventAnalytic />} />
          <Route path="/eventdetail" element={<EventDetail />} />
          <Route path="/datatable" element={<DataTable />} />
          <Route path="/formdesign" element={<FormDesign />} />
          <Route path="/pagecreate" element={<PageCreate />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/pageform" element={<PageForm />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/pagesetting" element={<PageSetting />} />
        </Route>
 
        {/* Customer routes */}
        <Route element={<CustomerLayout />}>
          <Route path="/event" element={<EventBooth />} />
          <Route path="/registerbooth" element={<RegisterBooth />} />
          <Route path="/loginbooth" element={<LoginBooth />} />
          <Route path="/confirmbooth" element={<ConfirmBooth />} />
          <Route path="/successbooth" element={<SuccessBooth />} />
          <Route path="/registersuccess" element={<SuccessRegister />} />
        </Route>
        
        {/* Page not found route */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default App