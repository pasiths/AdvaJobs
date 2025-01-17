import axios from "axios";
import { useState } from "react";
import { Button, Container, Form, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const CompanyRegisterPage = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    address: "",
    phone: "",
    industry: "",
    password: "",
    confirmPassword: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [loading, setLoading] = useState(false); // State for loading spinner

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    if (!formData.companyName.trim())
      errors.companyName = "Company name is required.";
    if (!formData.email.trim()) errors.email = "Email is required.";
    if (!formData.address.trim()) errors.address = "Address is required.";
    if (!formData.phone.trim()) errors.phone = "Phone number is required.";
    if (!formData.industry.trim()) errors.industry = "Industry is required.";
    if (formData.password.length < 8)
      errors.password = "Password must be at least 8 characters.";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match.";
    return errors;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleRegister = async () => {
    setLoading(true); // Show loading spinner
    try {
      const response = await axios.post(
        "/api/company/companies", // Ensure the protocol and endpoint are correct
        {
          name: formData.companyName,
          email: formData.email,
          location: formData.address,
          phoneNum: formData.phone,
          industry: formData.industry,
          password: formData.password,
          logo: "https://via.placeholder.com/150", // Placeholder image URL
          logoType: "image/png", // Placeholder image type
        }
      );

      const { data } = response;
      localStorage.setItem("companyToken", data.token);
      localStorage.setItem(
        "companyDetails",
        JSON.stringify(data.companyDetails)
      );

      setSuccessMessage("Registration successful! Redirecting...");
      setTimeout(() => (window.location.href = "/"), 3000); // Redirect after 3 seconds
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
      setTimeout(() => setErrorMessage(""), 5000); // Clear error after 5 seconds
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    const errors = validateForm();
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      handleRegister(); // Call register handler if no validation errors
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "800px" }}>
        <h2 className="text-center mb-4">Register as Company</h2>
        <br />

        <Form onSubmit={handleSubmit}>
          {/* Company Name Input */}
          <Form.Group controlId="formCompanyName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
              isInvalid={!!validationErrors.companyName}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.companyName}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Email Input */}
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
              isInvalid={!!validationErrors.email}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.email}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Address Input */}
          <Form.Group controlId="formAddress" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
              isInvalid={!!validationErrors.address}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.address}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Phone Input */}
          <Form.Group controlId="formPhone" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
              isInvalid={!!validationErrors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.phone}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Industry Input */}
          <Form.Group controlId="formIndustry" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
              isInvalid={!!validationErrors.industry}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.industry}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password Input */}
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
              isInvalid={!!validationErrors.password}
            />
            <Form.Text>
              Password should be comprised of at least 8 characters
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              {validationErrors.password}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Confirm Password Input */}
          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
              isInvalid={!!validationErrors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Create Account Button */}
          <Button
            variant="primary"
            className="w-100 p-3"
            style={{ backgroundColor: "#144B7D", border: "none" }}
            type="submit"
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
                {"Creating Account..."}
              </>
            ) : (
              "CREATE ACCOUNT"
            )}
          </Button>

          {/* Display Error Message */}
          {errorMessage && (
            <Alert
              variant="danger"
              onClose={() => setErrorMessage("")}
              dismissible
              className="mt-3"
            >
              {errorMessage}
            </Alert>
          )}

          {/* Display Success Message */}
          {successMessage && (
            <Alert
              variant="success"
              onClose={() => setSuccessMessage("")}
              dismissible
              className="mt-3"
            >
              {successMessage}
            </Alert>
          )}
        </Form>

        {/* Sign In Section */}
        <div className="text-center mt-4">
          <p className="text-muted">
            Already have an Account?{" "}
            <Link to='/companylogin'>Sign In</Link>
              
            
          </p>
        </div>
      </div>
    </Container>
  );
};

export default CompanyRegisterPage;
