import "./App.css";
import Navbar from "./components/Navigation/NavScrollExample";
import NavbarLogged from "./Components/Navigation/NavbarLogged";
import CompanyProfilePage from "./Pages/CompanyProfilePage";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Navigation/Footer";
import Home from "./Pages/HomePage";
import PublishJobPage from "./pages/PublishJobPage";
import JobsPage from "./pages/JobsPage";
import UserLoginPage from "./pages/UserLoginPage";
import CompanyLoginPage from "./pages/CompanyLoginPage";
import UserRegisterPage from "./pages/UserRegisterPage";
import CompanyRegisterPage from "./pages/CompanyRegisterPage";
import JobApplicationPage from "./pages/JobApplicationPage";
import UserProfilePage from "./pages/UserProfilePage";
import ContactUs from "./pages/ContactUsPage";
import JobDetail from "./pages/JobDetailPage";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

function App() {
  const [authToken, setAuthToken] = useState(null); // Initialize authToken as null
  const [cookies] = useCookies(["auth_token"]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading

  // Handle fetching and setting the authToken from cookies
  useEffect(() => {
    const tokenFromCookies = cookies.auth_token || null;
    setAuthToken(tokenFromCookies);
    // Simulate async process and set isLoading to false once done
    setTimeout(() => setIsLoading(false), 500);
  }, [cookies.auth_token]);

  return (
    <Router>
      {!authToken ? <Navbar /> : <NavbarLogged />}
      <hr />
      <hr />
      <hr />
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/publishjob" element={<PublishJobPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/userlogin" element={<UserLoginPage />} />
        <Route path="/companylogin" element={<CompanyLoginPage />} />
        <Route path="/register" element={<UserRegisterPage />} />
        <Route path="/companyregister" element={<CompanyRegisterPage />} />
        <Route path="/jobs/:jobId" element={<JobDetail />} />
        <Route path="/applypage/:jobId" element={<JobApplicationPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/cprofile" element={<CompanyProfilePage />} />

        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
