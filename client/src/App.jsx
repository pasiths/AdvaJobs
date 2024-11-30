import './App.css'
import Navbar from './Components/Navigation/Navbar'
import NavbarLogged from './Components/Navigation/NavbarLogged';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './Components/Navigation/Footer';
import Home from './Pages/HomePage';
import PublishJobPage from './pages/PublishJobPage';
import JobsPage from './pages/JobsPage';


function App() {
  return (
    <Router>
      <Navbar />
      <NavbarLogged />
      <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/publishjob" element={<PublishJobPage />} />
      <Route path="/jobs" element={<JobsPage />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;