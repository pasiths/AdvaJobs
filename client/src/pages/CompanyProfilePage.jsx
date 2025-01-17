import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
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
      logo: "https://cdn.britannica.com/88/129488-050-6B1CA905/Internet-blue-screen-blog-society-history-media-2009.jpg",
    }
  );

  const [isEditing, setIsEditing] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [cookies] = useCookies(["auth_token"]);

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
      console.error("Company Details Error:", error);
    }
  };

  useEffect(() => {
    const tokenFromCookies = cookies.auth_token || null;
    setAuthToken(tokenFromCookies);

    if (tokenFromCookies) {
      const decodedToken = decodeJWT(tokenFromCookies);
      const id = decodedToken?.companyId;
      if (id) {
        fetchCompanyDetails(id);
      }
    }
  }, [cookies.auth_token]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setCompanyProfileData({
      ...companyProfileData,
      [name]: value,
    });
  };

  const handleSaveProfile = async () => {
    if (!authToken) {
      setUpdateError("User is not authenticated.");
      return;
    }

    const decodedToken = decodeJWT(authToken);
    const companyId = decodedToken?.companyId;

    if (!companyId) {
      setUpdateError("Company ID is missing.");
      return;
    }

    try {
      const response = await axios.put(
        `/api/company/companies/${companyId}`,
        companyProfileData
      );

      setUpdateSuccess("Profile updated successfully!");
      setUpdateError(null);
      setIsEditing(false);
    } catch (error) {
      setUpdateSuccess(null);
      setUpdateError("Error updating profile. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/company/companies/logout", null, {
        headers: {
          Authorization: `Bearer ${cookies.auth_token}`, // Include the auth token if required
        },
      });
      removeCookie("auth_token", { path: "/" });
      navigate("/");
      console.log("Logout successful!");
    } catch (error) {
      console.error("Error during logout:", error.response?.data || error.message);
    }
  };

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
        <Col
          md={5}
          className="p-5 bg-white rounded shadow-sm"
          style={{ borderRadius: "10px", marginRight: "20px" }}
        >
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

          <h2 className="text-center mb-4" style={{ color: "#144B7D" }}>
            {companyProfileData.company_name}
          </h2>

          <Form>
            <Form.Group controlId="company_name">
              <Form.Label>Company Name:</Form.Label>
              <Form.Control
                type="text"
                name="company_name"
                value={companyProfileData.company_name}
                onChange={handleProfileChange}
                disabled={!isEditing}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={companyProfileData.email}
                onChange={handleProfileChange}
                disabled={!isEditing}
              />
            </Form.Group>

            <Form.Group controlId="location">
              <Form.Label>Location:</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={companyProfileData.location}
                onChange={handleProfileChange}
                disabled={!isEditing}
              />
            </Form.Group>

            <Form.Group controlId="phone_num">
              <Form.Label>Phone:</Form.Label>
              <Form.Control
                type="text"
                name="phone_num"
                value={companyProfileData.phone_num}
                onChange={handleProfileChange}
                disabled={!isEditing}
              />
            </Form.Group>

            <Form.Group controlId="industry">
              <Form.Label>Industry:</Form.Label>
              <Form.Control
                type="text"
                name="industry"
                value={companyProfileData.industry}
                onChange={handleProfileChange}
                disabled={!isEditing}
              />
            </Form.Group>

            <Button
              className="btn btn-primary w-100 mt-4"
              style={{ backgroundColor: "#144B7D", border: "none" }}
              onClick={isEditing ? handleSaveProfile : handleEditToggle}
            >
              {isEditing ? "Save Profile" : "Edit Profile"}
            </Button>

            {updateSuccess && (
              <Alert variant="success" className="mt-3">
                {updateSuccess}
              </Alert>
            )}
            {updateError && (
              <Alert variant="danger" className="mt-3">
                {updateError}
              </Alert>
            )}
            <hr />
            <Button
              style={{ backgroundColor: "#880808 ", border: "none" }}
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </Form>
        </Col>

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
