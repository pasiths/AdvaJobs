import { Button, Container, Form } from "react-bootstrap";

const CompanyRegisterPage = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '800px' }}>
        <h2 className="text-center mb-4">Register as Company</h2>
        <br />

        <Form>
          {/* Company Name Input */}
          <Form.Group controlId="formCompanyName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Company Name"
              className="p-3"
              style={{ backgroundColor: '#E0F2FF', border: 'none' }}
            />
          </Form.Group>

          {/* Email Input */}
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              className="p-3"
              style={{ backgroundColor: '#E0F2FF', border: 'none' }}
            />
          </Form.Group>

          {/* Address Input */}
          <Form.Group controlId="formAddress" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Address"
              className="p-3"
              style={{ backgroundColor: '#E0F2FF', border: 'none' }}
            />
          </Form.Group>

          {/* Phone Input */}
          <Form.Group controlId="formPhone" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Phone"
              className="p-3"
              style={{ backgroundColor: '#E0F2FF', border: 'none' }}
            />
          </Form.Group>

          {/* Industry Input */}
          <Form.Group controlId="formIndustry" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Industry"
              className="p-3"
              style={{ backgroundColor: '#E0F2FF', border: 'none' }}
            />
          </Form.Group>

              <Form.Group controlId="formProfilePicture" className="mb-3">
                <Form.Label>Logo:</Form.Label>
                <Form.Control
                  type="file"
                  name="logo"
                  accept="image/*"
                  className="p-2"
                  style={{ backgroundColor: '#E0F2FF', border: 'none' }}
                />
              </Form.Group>

        

          {/* Password Input */}
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              className="p-3"
              style={{ backgroundColor: '#E0F2FF', border: 'none' }}
            />
            <Form.Text>Password should be comprised of at least 8 characters</Form.Text>
          </Form.Group>

          {/* Confirm Password Input */}
          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              className="p-3"
              style={{ backgroundColor: '#E0F2FF', border: 'none' }}
            />
          </Form.Group>

          {/* Create Account Button */}
          <Button variant="primary" className="w-100 p-3" style={{ backgroundColor: '#144B7D', border: 'none' }}>
            CREATE ACCOUNT
          </Button>
        </Form>

        {/* Sign In Section */}
        <div className="text-center mt-4">
          <p className="text-muted">
            Already have an Account? <a href="loginRec" className="text-primary">Sign In</a>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default CompanyRegisterPage
;
