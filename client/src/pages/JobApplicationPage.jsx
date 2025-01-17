import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const JobApplicationPage = () => {
  const { jobId } = useParams();
  const [isApplied, setIsApplied] = useState(false);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const [profileData, setProfileData] = useState({
    userId: "",
    full_name: "",
    email: "",
    phone_num: "",
  });

  const [authToken, setAuthToken] = useState(null);
  const [cookies] = useCookies(["auth_token"]);
  const [isLoading, setIsLoading] = useState(true);

  const [message, setMessage] = useState(""); // State for the message text field

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
        phone_num: user.phoneNum,
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
      if (id) {
        fetchUserDetails(id);
      }
    }
  }, [cookies.auth_token]);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`/api/jobs/jobs/${jobId}`);
        const jobData = response.data;
        setJob(jobData);
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleApplyClick = async () => {
    const applicationData = {
      name: profileData.full_name,
      email: profileData.email,
      telephoneNo: profileData.phone_num,
      companyName: job.company_Name,
      jobTitle: job.title,
      message: message, // Include the current message
      dateApplied: new Date().toISOString(),
      userId: decodeJWT(authToken)?.userId,
      companyId: job.company_Id,
      jobId: job.id,
    };

    try {
      const response = await axios.post(
        "/api/application/applications",
        applicationData
      );
      if (response.status === 200) {
        setIsApplied(true);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  if (loading) {
    return <p>Loading job details...</p>;
  }

  if (!job) {
    return <p>Job not found.</p>;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <h2 className="mb-4">{`${job.title} | ${job.jobType} `}</h2>
          <h2 className="mb-4">{` ${job.company_Name}`}</h2>
          <p>
            Please read all content of the advertisement and apply. If any
            information is required from the advertiser, please send with this
            message. Also, you can send an attachment up to 2MB.
          </p>

          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)} // Update message on change
              placeholder="You can write a message here"
              className="border rounded p-3"
            />
          </Form.Group>

          {!isApplied ? (
            <Button
              variant="primary"
              className="w-100 p-2"
              onClick={handleApplyClick}
            >
              APPLY NOW
            </Button>
          ) : (
            <>
              <Button variant="success" className="w-100 p-2 mb-3" disabled>
                Successfully Applied
              </Button>
              <Link to="/" className="text-center w-100 d-block text-primary">
                Back to Home
              </Link>
            </>
          )}
        </Col>

        <Col md={4}>
          <Card className="p-4 rounded" style={{ backgroundColor: "#E7F1FF" }}>
            <h4 className="text-center">{`${job.title} | ${job.jobType}`}</h4>
            <h5 className="text-center">{`${
              job.company_Name || "Unknown Company"
            }`}</h5>
            <p className="text-center">
              {job.location || "Location not specified"} <br />
              {job.jobType} <br />
              {Math.max(
                0,
                Math.ceil(
                  (new Date(job.closeDate) - new Date()) / (1000 * 60 * 60 * 24)
                )
              )}{" "}
              Days Left
            </p>
            <hr />
            <p>{job.content}</p>
            <h5>Contact</h5>
            <p>
              {job.phone} <br />
              {job.email} <br />
              {job.company_Name || "Unknown Company"}
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default JobApplicationPage;
