import './App.css'
import Navbar from './Components/Navigation/Navbar'
import NavbarLogged from './Components/Navigation/NavbarLogged';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Navigation/Footer';
import Home from './Pages/HomePage';
import PublishJobPage from './pages/PublishJobPage';
import JobsPage from './pages/JobsPage';
import UserLoginPage from './pages/UserLoginPage';
import CompanyLoginPage from './pages/CompanyLoginPage';
import UserRegisterPage from './pages/UserRegisterPage';
import CompanyRegisterPage from './pages/CompanyRegisterPage';
import JobDetailPage from './pages/JobDetailPage';
import JobApplicationPage from './pages/JobApplicationPage';
import UserProfilePage from './pages/UserProfilePage';
import ContactUs from './pages/ContactUsPage';


function App() {
  return (
    <Router>
      <Navbar />
      <NavbarLogged />
      <hr /><hr /><hr /><hr />
      <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/publishjob" element={<PublishJobPage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/userlogin" element={<UserLoginPage />} />
      <Route path="/companylogin" element={<CompanyLoginPage />} />
      <Route path="/register" element={<UserRegisterPage />} />
      <Route path="/companyregister" element={<CompanyRegisterPage />} />
      <Route path="/jobdetail" element={<JobDetailPage />} />
      <Route path="/applypage" element={<JobApplicationPage />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="/contact" element={<ContactUs />} />
    
      
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;