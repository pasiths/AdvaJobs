import { useState, useEffect } from "react";
import { Form, Button, Container, Spinner, Row, Col } from "react-bootstrap";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    location: "",
    phoneNum: "",
    gender: "",
    profilePic: null,
    cv: null,
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required.";
    if (!formData.email.trim()) errors.email = "Email is required.";
    if (!formData.phoneNum.trim())
      errors.phoneNum = "Phone number is required.";
    if (!formData.location.trim()) errors.location = "Location is required.";
    if (!formData.gender.trim()) errors.gender = "Select your gender.";
    if (!formData.profilePic)
      errors.profilePic = "Profile picture is required.";
    if (!formData.cv) errors.cv = "CV is required.";
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
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Name"
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
              isInvalid={!!validationErrors.fullName}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.fullName}
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
          <Form.Group controlId="formLocation" className="mb-3">
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Home Town"
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
              isInvalid={!!validationErrors.location}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.location}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Phone Input */}
          <Form.Group controlId="formPhoneNum" className="mb-3">
            <Form.Control
              type="text"
              name="phoneNum"
              value={formData.phoneNum}
              onChange={handleChange}
              placeholder="Phone"
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
              isInvalid={!!validationErrors.phoneNum}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.phoneNum}
            </Form.Control.Feedback>
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
                isInvalid={!!validationErrors.gender}
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
                isInvalid={!!validationErrors.gender}
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
                isInvalid={!!validationErrors.gender}
              />
              {validationErrors.gender && (
                <div className="text-danger">{validationErrors.gender}</div>
              )}
            </div>
          </Form.Group>

          {/* Profile Picture and CV Upload */}
          <Row>
            <Col>
              <Form.Group controlId="formProfilePic" className="mb-3">
                <Form.Label>Profile Picture:</Form.Label>
                <Form.Control
                  type="file"
                  name="profilePic"
                  accept="image/*"
                  onChange={handleChange}
                  className="p-2"
                  style={{ backgroundColor: "#E0F2FF", border: "none" }}
                  isInvalid={!!validationErrors.profilePic}
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors.profilePic}
                </Form.Control.Feedback>
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
                  isInvalid={!!validationErrors.cv}
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors.cv}
                </Form.Control.Feedback>
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
