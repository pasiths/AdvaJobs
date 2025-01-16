import { useState } from "react";
import { Form, Button, Container, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

const UserLoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) errors.email = "Email is required.";
    if (formData.password.length < 8)
      errors.password = "Password must be at least 8 characters.";
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

  // Handle login
  const handleLogin = async () => {
    setLoading(true); // Show loading spinner
    try {
      const response = await axios.post("/api/user/users/login", {
        email: formData.email,
        password: formData.password,
      });

      // Save response (e.g., token or user data) to localStorage
      const { data } = response;
      localStorage.setItem("companyToken", data.token); // Adjust the key and value as per API response
      localStorage.setItem(
        "companyDetails",
        JSON.stringify(data.companyDetails)
      ); // Save additional details if provided

      // Notify user of success
      alert("Login Successful!");

      // Redirect or perform other actions as needed
      window.location.href = "/"; // Replace with actual dashboard route
    } catch (error) {
      // Set error message and clear it after 5 seconds
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
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
      handleLogin(); // Call login handler if no validation errors
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4">Job Seeker Log In</h2>

        {/* Login Form */}
        <Form onSubmit={handleSubmit}>
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

          {/* Forgot Password */}
          <div className="d-flex justify-content-between mb-3">
            <a href="#" className="text-muted">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <Button
            variant="primary"
            className="w-100 p-3"
            style={{ backgroundColor: "#144B7D", border: "none" }}
            type="submit"
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
                {" Logging in..."}
              </>
            ) : (
              "LOG IN"
            )}
          </Button>
          {/* Display Error Message */}
          {errorMessage && (
            <Alert
              variant="danger"
              onClose={() => setErrorMessage("")}
              dismissible
            >
              {errorMessage}
            </Alert>
          )}
        </Form>

        {/* Register Link */}
        <div className="text-center mt-4">
          <p className="text-muted">
            Don&#39;t have an Account?{" "}
            <a href="/register" className="text-primary">
              Register Now
            </a>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default UserLoginPage;
