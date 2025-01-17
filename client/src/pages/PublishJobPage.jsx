import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useCookies } from "react-cookie";

function PostJob() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [companyProfileData, setCompanyProfileData] = useState({
    company_name: "Tech Solutions Inc.",
  });

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const jobData = {
      title: form.formPostTitle.value,
      location: form.formLocation.value,
      closeDate: form.formCloseDate.value,
      description: form.formDescription.value,
      phone: form.formPhone.value,
      email: form.formEmail.value,
      content: form.formContent.value,
      jobType: form.formJobType.value,
      salary: parseFloat(form.formSalary.value),
      status: "Active",
      company_Name: companyProfileData.company_name,
      company_Id: decodeJWT(authToken)?.companyId,
      createdAt: new Date().toISOString(),
      updatedAt: null,
    };

    try {
      const response = await fetch("http://localhost:8080/api/jobs/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setShowError(false);
        form.reset();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to post job.");
        setShowSuccess(false);
        setShowError(true);
      }
    } catch (error) {
      setErrorMessage(error.message || "An unexpected error occurred.");
      setShowSuccess(false);
      setShowError(true);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Post Job</h2>

      <Form onSubmit={handleSubmit}>
        {/* Post Title */}
        <Form.Group controlId="formPostTitle" className="mb-3">
          <Form.Label>Post Title</Form.Label>
          <Form.Control type="text" placeholder="Enter post title" required />
        </Form.Group>

        {/* Location */}
        <Form.Group controlId="formLocation" className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" placeholder="Enter location" required />
        </Form.Group>

        {/* Close Date */}
        <Form.Group controlId="formCloseDate" className="mb-3">
          <Form.Label>Close Date</Form.Label>
          <Form.Control type="date" required />
        </Form.Group>

        {/* Description */}
        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter job description"
            required
          />
        </Form.Group>

        {/* Phone and Email */}
        <Row>
          <Col>
            <Form.Group controlId="formPhone" className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>
          </Col>
        </Row>

        {/* Job Type */}
        <Form.Group controlId="formJobType" className="mb-3">
          <Form.Label>Job Type</Form.Label>
          <Form.Control as="select" required>
            <option value="">Select job type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
          </Form.Control>
        </Form.Group>

        {/* Salary */}
        <Form.Group controlId="formSalary" className="mb-3">
          <Form.Label>Salary</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter salary"
            step="0.01"
            required
          />
        </Form.Group>

        {/* Content */}
        <Form.Group controlId="formContent" className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter additional content"
            required
          />
        </Form.Group>

        {/* Buttons: Post and Cancel */}
        <div className="d-flex justify-content-end">
          <Button variant="outline-secondary" className="me-2">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Post
          </Button>
        </div>
      </Form>

      {/* Success Message */}
      {showSuccess && (
        <Alert variant="success" className="mt-3">
          Job posted successfully!
        </Alert>
      )}

      {/* Error Message */}
      {showError && (
        <Alert variant="danger" className="mt-3">
          {errorMessage}
        </Alert>
      )}
    </Container>
  );
}

export default PostJob;
