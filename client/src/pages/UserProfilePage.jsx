import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import JobCard from "../components/Profile/AppliedJobCard"; // Assuming the JobCard component is created.
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useCookies } from "react-cookie";
import axios from "axios";

const UserProfile = ({ userData }) => {
  const [profileData, setProfileData] = useState(
    userData || {
      full_name: "John Doe",
      email: "johndoe@example.com",
      location: "New York, USA",
      phone_num: "+1 234 567 890",
      gender: "Male",
      profile_pic:
        "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=150", // Example profile picture URL
      ucv: "https://example.com/path/to/cv.pdf",
    }
  );

  const [cv, setCv] = useState(null); // State to hold the CV file
  const [cvName, setCvName] = useState("No CV Uploaded");

  const [authToken, setAuthToken] = useState(null); // Initialize authToken as null
  const [cookies] = useCookies(["auth_token"]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading

  const decodeJWT = (auth_token) => {
    if (auth_token) {
      const [, payload] = auth_token.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      console.log("Decoded JWT Payload:", decodedPayload);
      return decodedPayload;
    }
    return null;
  };

  const fetchUserDetails = async (id) => {
    try {
      const response = await axios.get(`/api/user/users/${id}`);
      console.log("User Details Response:", response.data);
      const user = response.data;

      setProfileData({
        full_name: user.fullName,
        email: user.email,
        location: user.location,
        phone_num: user.phoneNum,
        gender: user.gender,
        profile_pic: `/api/user/${user.profilePic.replace(/\\/g, "/")}`,
        ucv: `/api/user/${user.cv.replace(/\\/g, "/")}`,
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
      const id = decodedToken?.userId;
      console.log("User ID from JWT:", id);
      if (id) {
        fetchUserDetails(id);
      }
    }
  }, [cookies.auth_token]);

  const appliedJobs = [
    {
      jobTitle: "Software Engineer",
      companyName: "Google",
      timeAgo: "2 hours ago",
      location: "Mountain View, CA",
    },
    {
      jobTitle: "Product Manager",
      companyName: "Amazon",
      timeAgo: "1 day ago",
      location: "Seattle, WA",
    },
    {
      jobTitle: "Data Scientist",
      companyName: "Facebook",
      timeAgo: "3 days ago",
      location: "Menlo Park, CA",
    },
  ];

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCv(file);
      setCvName(file.name);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh", backgroundColor: "#f9f9f9" }}
    >
      <Row className="w-100" style={{ maxWidth: "1200px" }}>
        {/* Left Side - My Details */}
        <Col
          md={5}
          className="p-5 bg-white rounded shadow-sm"
          style={{ borderRadius: "10px", marginRight: "20px" }}
        >
          {/* Profile Picture */}
          <div className="text-center mb-4">
            <img
              src={profileData.profile_pic}
              alt="Profile"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #144B7D",
              }}
            />
          </div>

          {/* Full Name */}
          <h2 className="text-center mb-4" style={{ color: "#144B7D" }}>
            {profileData.full_name}
          </h2>

          {/* User Details */}
          <div style={{ lineHeight: "2", fontSize: "1.1rem" }}>
            <p>
              <strong>Full Name:</strong> {profileData.full_name}
            </p>
            <p>
              <strong>Email:</strong> {profileData.email}
            </p>
            <p>
              <strong>Location:</strong> {profileData.location}
            </p>
            <p>
              <strong>Phone:</strong> {profileData.phone_num}
            </p>
            <p>
              <strong>Gender:</strong> {profileData.gender}
            </p>
          </div>

          {/* Navigate to Edit Profile Page */}
          <Button
            className="btn btn-primary w-100 mt-4"
            style={{ backgroundColor: "#144B7D", border: "none" }}
          >
            Edit Profile
          </Button>
        </Col>

        {/* Right Side - Applied Job History */}
        <Col
          md={6}
          className="p-5 bg-white rounded shadow-sm"
          style={{ borderRadius: "10px" }}
        >
          <h4 className="text-center mb-4" style={{ color: "#144B7D" }}>
            Applied Job History
          </h4>
          {appliedJobs.map((job, idx) => (
            <JobCard
              key={idx}
              jobTitle={job.jobTitle}
              companyName={job.companyName}
              timeAgo={job.timeAgo}
              location={job.location}
            />
          ))}

          {/* CV Upload Section */}
          <div className="mt-4">
            <h5>Upload CV</h5>
            <Form.Group controlId="cvUpload" className="mb-3">
              <Form.Control
                type="file"
                accept=".pdf, .docx, .doc"
                onChange={handleCvChange}
              />
              <small>{cvName}</small>
            </Form.Group>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
