import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import PostedJobCard from "../components/Profile/PostedJobCard"; // Replace with the actual component for posted job cards
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const CompanyProfile = ({ companyData }) => {
  const [companyProfileData, setCompanyProfileData] = useState(
    companyData || {
      company_name: "Tech Solutions Inc.",
      email: "info@techsolutions.com",
      location: "Silicon Valley, USA",
      phone_num: "+1 987 654 3210",
      industry: "Software Development",
      logo: "https://cdn.britannica.com/88/129488-050-6B1CA905/Internet-blue-screen-blog-society-history-media-2009.jpg", // Example profile picture URL
    }
  );

  const [authToken, setAuthToken] = useState(null); // Initialize authToken as null
  const [cookies] = useCookies(["auth_token"]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading

  const decodeJWT = (auth_token) => {
    if (auth_token) {
      const [, payload] = auth_token.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload;
    }
    return null;
  };

  const fetchCompanyDetails = async (id) => {
    try {
      const response = await axios.get(`/api/company/companies/${id}`);
      const company = response.data;
      setCompanyProfileData({
        company_name: company.name,
        email: company.email,
        location: company.location,
        phone_num: company.phoneNum,
        industry: company.industry,
        logo: company.logo,
      });
    } catch (error) {
      console.error("User Details Error:", error);
    }
  };

  useEffect(() => {
    const tokenFromCookies = cookies.auth_token || null;
    setAuthToken(tokenFromCookies);
    setTimeout(() => setIsLoading(false), 500);

    if (tokenFromCookies) {
      const decodedToken = decodeJWT(tokenFromCookies);
      const id = decodedToken?.companyId;
      if (id) {
        fetchCompanyDetails(id);
      }
    }
  }, [cookies.auth_token]);

  const postedJobs = [
    {
      jobTitle: "Full Stack Developer",
      jobDescription: "Build scalable web applications.",
      postedDate: "2025-01-15",
      location: "Remote",
    },
    {
      jobTitle: "UI/UX Designer",
      jobDescription: "Design user-friendly interfaces.",
      postedDate: "2025-01-12",
      location: "New York, NY",
    },
    {
      jobTitle: "Project Manager",
      jobDescription: "Manage cross-functional teams.",
      postedDate: "2025-01-10",
      location: "Los Angeles, CA",
    },
  ];

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh", backgroundColor: "#f9f9f9" }}
    >
      <Row className="w-100" style={{ maxWidth: "1200px" }}>
        {/* Left Side - Company Details */}
        <Col
          md={5}
          className="p-5 bg-white rounded shadow-sm"
          style={{ borderRadius: "10px", marginRight: "20px" }}
        >
          {/* Profile Picture */}
          <div className="text-center mb-4">
            <img
              src={companyProfileData.logo}
              alt="Company Logo"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #144B7D",
              }}
            />
          </div>

          {/* Company Name */}
          <h2 className="text-center mb-4" style={{ color: "#144B7D" }}>
            {companyProfileData.company_name}
          </h2>

          {/* Company Details */}
          <div style={{ lineHeight: "2", fontSize: "1.1rem" }}>
            <p>
              <strong>Company Name:</strong> {companyProfileData.company_name}
            </p>
            <p>
              <strong>Email:</strong> {companyProfileData.email}
            </p>
            <p>
              <strong>Location:</strong> {companyProfileData.location}
            </p>
            <p>
              <strong>Phone:</strong> {companyProfileData.phone_num}
            </p>
            <p>
              <strong>Industry:</strong> {companyProfileData.industry}
            </p>
          </div>

          {/* Navigate to Edit Company Profile Page */}
          <Button
            className="btn btn-primary w-100 mt-4"
            style={{ backgroundColor: "#144B7D", border: "none" }}
          >
            Edit Company Details
          </Button>
        </Col>

        {/* Right Side - Posted Job History */}
        <Col
          md={6}
          className="p-5 bg-white rounded shadow-sm"
          style={{ borderRadius: "10px" }}
        >
          <h4 className="text-center mb-4" style={{ color: "#144B7D" }}>
            Posted Job History
          </h4>
          {postedJobs.map((job, idx) => (
            <PostedJobCard
              key={idx}
              jobTitle={job.jobTitle}
              postedDate={job.postedDate}
              location={job.location}
            />
          ))}

          {/* Post New Job Button */}
          <div className="mt-4 text-center">
            <Link to="/publishjob">
              <Button
                className="btn btn-success"
                style={{ backgroundColor: "#28a745", border: "none" }}
              >
                Post a New Job
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CompanyProfile;
