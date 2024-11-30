import  { useRef, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";

const CompanyLoginPage = () => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const recaptchaRef = useRef(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null); // Store reCAPTCHA token
  const [loading, setLoading] = useState(false); // State for loading

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate a login process (replace with your login logic)
    setTimeout(() => {
      console.log("Login successful with", { email, password });
      setLoading(false);
    }, 2000);
  };

  const onRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4">Recruiter Log In</h2>

        {/* Login Form */}
        <Form onSubmit={handleSubmit}>
          {/* Email Input */}
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)} // update state
            />
          </Form.Group>

          {/* Password Input */}
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)} // update state
            />
          </Form.Group>

          {/* Forgot Password */}
          <div className="d-flex justify-content-between mb-3">
            <a href="#" className="text-muted">
              Forgot Password?
            </a>
            <a href="#" className="text-primary">
              Reset
            </a>
          </div>

          {/* reCAPTCHA */}
          <ReCAPTCHA
            ref={recaptchaRef} // Assign ref to reset the widget
            sitekey="6Le0oUYqAAAAAJNvvKKCKMIdIFC7AQwT1QRKoZyt"
            onChange={onRecaptchaChange}
          />

          {/* Login Button */}
          <Button
            variant="primary"
            className="w-100 p-3"
            style={{ backgroundColor: "#144B7D", border: "none" }}
            type="submit"
            disabled={loading || !recaptchaToken} // Disable button if loading or no reCAPTCHA token
          >
            {loading ? "Loading..." : "LOG IN"}
          </Button>
        </Form>

        {/* Register Link */}
        <div className="text-center mt-4">
          <p className="text-muted">
            Don&#39;t have an Account?{" "}
            <a href="/registerRec" className="text-primary">
              Register Now
            </a>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default CompanyLoginPage;
