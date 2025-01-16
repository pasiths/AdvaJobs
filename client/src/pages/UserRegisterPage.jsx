import { useState, useEffect } from "react";
import { Form, Button, Container, Spinner, Row, Col } from "react-bootstrap";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    location: "",
    phone_num: "",
    gender: "",
    profile_pic: null,
    cv: null,
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [jsonData, setJsonData] = useState([]);

  // Fetch data.json during the initial load
  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setJsonData(data))
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    if (!formData.full_name.trim()) errors.full_name = "Full name is required.";
    if (!formData.email.trim()) errors.email = "Email is required.";
    if (formData.password.length < 8)
      errors.password = "Password must be at least 8 characters.";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match.";
    return errors;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    const errors = validateForm();
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setLoading(true);

    // Simulate saving data
    const updatedData = [...jsonData, formData];
    setJsonData(updatedData);

    // Simulate delay
    setTimeout(() => {
      setLoading(false);
      console.log("Updated JSON Data:", updatedData);
      alert("Form submitted successfully!");
    }, 2000);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "800px" }}>
        <h2 className="text-center mb-4">Register</h2>
        <br />

        {/* Registration Form */}
        <Form onSubmit={handleSubmit} noValidate>
          {/* Name Input */}
          <Form.Group controlId="formName" className="mb-3">
            <Form.Control
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Name"
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
              isInvalid={!!validationErrors.full_name}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.full_name}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Email Input */}
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
              isInvalid={!!validationErrors.email}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.email}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Home Town Input */}
          <Form.Group controlId="formHomeTown" className="mb-3">
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Home Town"
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
            />
          </Form.Group>

          {/* Phone Input */}
          <Form.Group controlId="formPhone" className="mb-3">
            <Form.Control
              type="text"
              name="phone_num"
              value={formData.phone_num}
              onChange={handleChange}
              placeholder="Phone"
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
            />
          </Form.Group>

          {/* Gender Radio Options */}
          <Form.Group className="mb-3">
            <Form.Label>Gender:</Form.Label>
            <div>
              <Form.Check
                inline
                label="Male"
                name="gender"
                type="radio"
                id="gender-male"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                required
              />
              <Form.Check
                inline
                label="Female"
                name="gender"
                type="radio"
                id="gender-female"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
                required
              />
              <Form.Check
                inline
                label="Other"
                name="gender"
                type="radio"
                id="gender-other"
                value="Other"
                checked={formData.gender === "Other"}
                onChange={handleChange}
              />
            </div>
          </Form.Group>

          {/* Profile Picture and CV Upload */}
          <Row>
            <Col>
              <Form.Group controlId="formProfilePicture" className="mb-3">
                <Form.Label>Profile Picture:</Form.Label>
                <Form.Control
                  type="file"
                  name="profile_pic"
                  accept="image/*"
                  onChange={handleChange}
                  className="p-2"
                  style={{ backgroundColor: "#E0F2FF", border: "none" }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formCV" className="mb-3">
                <Form.Label>CV:</Form.Label>
                <Form.Control
                  type="file"
                  name="cv"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                  className="p-2"
                  style={{ backgroundColor: "#E0F2FF", border: "none" }}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Password Input */}
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
              isInvalid={!!validationErrors.password}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.password}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Confirm Password Input */}
          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
              isInvalid={!!validationErrors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            className="w-100 p-3"
            style={{ backgroundColor: "#144B7D", border: "none" }}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                {" Registering..."}
              </>
            ) : (
              "CREATE ACCOUNT"
            )}
          </Button>
        </Form>

        {/* Sign In Section */}
        <div className="text-center mt-4">
          <p className="text-muted">
            Already have an Account?{" "}
            <a href="/login" className="text-primary">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default RegisterForm;
