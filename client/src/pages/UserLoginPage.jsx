import { useRef, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";

const UserLoginPage = () => {
  const recaptchaRef = useRef(null);
  const [email, setEmail] = useState(""); // email state
  const [password, setPassword] = useState(""); // password state
  const [loading, ] = useState(false); // loading state
  const [recaptchaToken, setRecaptchaToken] = useState(null); // reCAPTCHA token state

  const onRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4">Job Seeker Log In</h2>

        {/* Login Form */}
        <Form>
          {/* Email Input */}
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)} // update email state
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
              onChange={(e) => setPassword(e.target.value)} // update password state
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
            type="submit" // form submission button
            disabled={loading || !recaptchaToken} // disable button while loading or if no recaptcha token
          >
            {loading ? "Loading..." : "LOG IN"} {/* show loading */}
          </Button>
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
