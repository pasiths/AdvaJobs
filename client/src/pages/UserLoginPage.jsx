import { useRef, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";

const UserLoginPage = () => {
  const recaptchaRef = useRef(null);
  const [email, setEmail] = useState(""); // email state
  const [password, setPassword] = useState(""); // password state
  const [loading, setLoading] = useState(false); // loading state
  const [recaptchaToken, setRecaptchaToken] = useState(null); // reCAPTCHA token state

  // Handle reCAPTCHA change
  const onRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    // Simulate login logic (Replace this with your API call)
    setTimeout(() => {
      console.log("Logged in successfully with", { email, password });
      setLoading(false);
    }, 2000);
  };

  // Reset form fields
  const handleReset = () => {
    setEmail("");
    setPassword("");
    recaptchaRef.current?.reset();
    setRecaptchaToken(null);
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
            <Form.Label className="sr-only">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          {/* Password Input */}
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label className="sr-only">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              className="p-3"
              style={{ backgroundColor: "#E0F2FF", border: "none" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {/* Forgot Password */}
          <div className="d-flex justify-content-between mb-3">
            <a href="#" className="text-muted">
              Forgot Password?
            </a>
            <a href="#" className="text-primary" onClick={handleReset}>
              Reset
            </a>
          </div>

          {/* reCAPTCHA */}
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6Le0oUYqAAAAAJNvvKKCKMIdIFC7AQwT1QRKoZyt"
            onChange={onRecaptchaChange}
          />

          {/* Login Button */}
          <Button
            variant="primary"
            className="w-100 p-3"
            style={{ backgroundColor: "#144B7D", border: "none" }}
            type="submit"
            disabled={loading || !recaptchaToken}
          >
            {loading ? "Loading..." : "LOG IN"}
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
