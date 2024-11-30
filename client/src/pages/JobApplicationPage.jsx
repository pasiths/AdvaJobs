import { useState } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const JobApplicationPage = () => {
  // Step 1: Add state to track whether the button was clicked
  const [isApplied, setIsApplied] = useState(false);

  // Step 2: Handle the button click event
  const handleApplyClick = () => {
    setIsApplied(true);  // Change the state when the button is clicked
  };

  return (
    <Container className="mt-5">
      <Row>
        {/* Left Section - Job Details and Form */}
        <Col md={8}>
          <h2 className="mb-4">UI/UX Engineer | Full Time | Google</h2>
          <p>Please read all content of the advertisement and apply. If any information is required from the advertiser, please send with this message. Also, you can send an attachment up to 2MB.</p>

          {/* Message Box */}
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="You can write a message here"
              className="border rounded p-3"
            />
          </Form.Group>

          {/* File Attachment */}
        
            <Form.Group controlId="formProfilePicture" className="mb-3">
                <Form.Label>Upload file here:</Form.Label>
                <Form.Control
                    type="file"
                    name="profile_pic"
                    accept="image/*"
                    className="p-2"
                    style={{ backgroundColor: '#E0F2FF', border: 'none' }}            />
                </Form.Group>

          {/* Apply Button or Success Message */}
          {!isApplied ? (
            // Step 3: Render the Apply Now button if not applied yet
            <Button variant="primary" className="w-100 p-2" onClick={handleApplyClick}>
              APPLY NOW
            </Button>
          ) : (
            // Step 4: Render the success message and Back to Home link after applying
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

        {/* Right Section - Job Info Card */}
        <Col md={4}>
          <Card className="p-4 mb-4" style={{ backgroundColor: '#E7F1FF' }}>
            <div className="text-center mb-4">
              <img
                src="https://via.placeholder.com/60"
                alt="company logo"
                className="mb-2"
              />
              <h5>UI/UX Engineer | Full Time | Google</h5>
              <p>No 123, Vijerama Road Colombo 7 <br /> Full Time <br /> 2 Days Left</p>
            </div>
            <hr />
            <p>
              In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
            </p>
            <h6>Contact</h6>
            <p>
              +94 701234567 <br />
              +94 11234567 <br />
              companyname@gmail.com
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default JobApplicationPage;
