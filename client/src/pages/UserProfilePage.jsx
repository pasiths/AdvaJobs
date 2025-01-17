import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import JobCard from "../components/Profile/AppliedJobCard";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ userData }) => {
  const [profileData, setProfileData] = useState(
    userData || {
      full_name: "John Doe",
      email: "johndoe@example.com",
      location: "New York, USA",
      phone_num: "+1 234 567 890",
      gender: "Male",
      profile_pic:
        "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=150",
      ucv: "https://example.com/path/to/cv.pdf",
    }
  );

  const [cv, setCv] = useState(null); // State to hold the CV file
  const [authToken, setAuthToken] = useState(null); // Initialize authToken as null
  const [cookies, setCookie, removeCookie] = useCookies(["auth_token"]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const navigate = useNavigate(); // Ensure this is defined within the component

  

  const decodeJWT = (auth_token) => {
    if (auth_token) {
      const [, payload] = auth_token.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload;
    }
    return null;
  };

  const fetchUserDetails = async (id) => {
    try {
      const response = await axios.get(`/api/user/users/${id}`);
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

  useEffect(() => {
    const tokenFromCookies = cookies.auth_token || null;
    setAuthToken(tokenFromCookies);
    setTimeout(() => setIsLoading(false), 500);

    if (tokenFromCookies) {
      const decodedToken = decodeJWT(tokenFromCookies);
      const id = decodedToken?.userId;
      if (id) {
        fetchUserDetails(id);
      }
    }
  }, [cookies.auth_token]);

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCv(file);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    if (!authToken) {
      setUpdateError("User is not authenticated.");
      return;
    }
  
    const decodedToken = decodeJWT(authToken);
    const userId = decodedToken?.userId;
  
    if (!userId) {
      setUpdateError("User ID is missing.");
      return;
    }
  
    const formData = new FormData();
    formData.append("fullName", profileData.full_name.trim());
    formData.append("email", profileData.email.trim());
    formData.append("location", profileData.location.trim());
    formData.append("phoneNum", profileData.phone_num.trim());
    formData.append("gender", profileData.gender.trim());
  
    if (cv) {
      formData.append("cv", cv);
    }
  
    try {
      const response = await axios.put(`/api/user/users/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Update profile data with the new CV URL from the response
      if (cv) {
        const updatedCvUrl = `/api/user/${response.data.cv.replace(/\\/g, "/")}`;
        setProfileData((prevData) => ({
          ...prevData,
          ucv: updatedCvUrl,
        }));
      }
  
      setUpdateSuccess("Profile updated successfully!");
      setUpdateError(null);
      setIsEditing(false);
    } catch (error) {
      setUpdateSuccess(null);
      if (error.response) {
        console.error("Error updating profile:", error.response.data);
        setUpdateError(error.response.data.message || "Unknown error occurred");
      } else {
        setUpdateError("Error updating profile. Please try again.");
      }
    }
  };
  

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8081/user/users/logout", null, {
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

          <h2 className="text-center mb-4" style={{ color: "#144B7D" }}>
            {profileData.full_name}
          </h2>

          <div style={{ lineHeight: "2", fontSize: "1.1rem" }}>
            <Form.Group controlId="full_name">
              <Form.Label>Full Name:</Form.Label>
              <Form.Control
                type="text"
                name="full_name"
                value={profileData.full_name}
                onChange={handleProfileChange}
                disabled={!isEditing}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                disabled={!isEditing}
              />
            </Form.Group>

            <Form.Group controlId="location">
              <Form.Label>Location:</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={profileData.location}
                onChange={handleProfileChange}
                disabled={!isEditing}
              />
            </Form.Group>

            <Form.Group controlId="phone_num">
              <Form.Label>Phone:</Form.Label>
              <Form.Control
                type="text"
                name="phone_num"
                value={profileData.phone_num}
                onChange={handleProfileChange}
                disabled={!isEditing}
              />
            </Form.Group>

            <Form.Group controlId="gender">
              <Form.Label>Gender:</Form.Label>
              <Form.Control
                type="text"
                name="gender"
                value={profileData.gender}
                onChange={handleProfileChange}
                disabled={!isEditing}
              />
            </Form.Group>

            <Form.Group controlId="cv">
              <Form.Label>CV:</Form.Label>
              {isEditing ? (
                <Form.Control
                  type="file"
                  accept=".pdf, .docx, .doc"
                  onChange={handleCvChange}
                />
              ) : (
                <a
                  href={profileData.ucv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-link"
                >
                  Download CV
                </a>
              )}
            </Form.Group>
          </div>

          <Button
            className="btn btn-primary w-100 mt-4"
            style={{ backgroundColor: "#144B7D", border: "none" }}
            onClick={isEditing ? handleSaveProfile : handleEditToggle}
          >
            {isEditing ? "Save Profile" : "Edit Profile"}
          </Button>

          {updateSuccess && <Alert variant="success" className="mt-3">{updateSuccess}</Alert>}
          {updateError && <Alert variant="danger" className="mt-3">{updateError}</Alert>}

          <hr />
          <Button style={{ backgroundColor: "#880808 ", border: "none" }} onClick={handleLogout}>Log Out</Button>
        </Col>

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
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
