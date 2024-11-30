import './App.css'
import Navbar from './Components/Navigation/Navbar'
import NavbarLogged from './Components/Navigation/NavbarLogged';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './Components/Navigation/Footer';
import Home from './Pages/HomePage';
import PublishJobPage from './pages/PublishJobPage';
import JobsPage from './pages/JobsPage';
import UserLoginPage from './pages/UserLoginPage';
import CompanyLoginPage from './pages/CompanyLoginPage';
import UserRegisterPage from './pages/UserRegisterPage';
import CompanyRegisterPage from './pages/CompanyRegisterPage';


function App() {
  return (
    <Router>
      <Navbar />
      <NavbarLogged />
      <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/publishjob" element={<PublishJobPage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/userlogin" element={<UserLoginPage />} />
      

      <Route path="/companylogin" element={<CompanyLoginPage />} />
      <Route path="/register" element={<UserRegisterPage />} />
      <Route path="/companyregister" element={<CompanyRegisterPage />} />
      
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;