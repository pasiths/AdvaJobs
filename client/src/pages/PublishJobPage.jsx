import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

function PostJob() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle form submission (e.g., API call)
    
    // Show success message after form submission
    setShowSuccess(true);
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
          <Form.Control as="textarea" rows={3} placeholder="Enter job description" required />
        </Form.Group>

        {/* Phone and Email */}
        <Row>
          <Col>
            <Form.Group controlId="formPhone" className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder="Enter phone number" required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>
          </Col>
        </Row>

        {/* Content */}
        <Form.Group controlId="formContent" className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows={5} placeholder="Enter additional content" required />
        </Form.Group>

        {/* Buttons: Post and Cancel */}
        <div className="d-flex justify-content-end">
          <Button variant="outline-secondary" className="me-2">Cancel</Button>
          <Button variant="primary" type="submit">Post</Button>
        </div>
      </Form>

      {/* Success Message */}
      {showSuccess && (
        <Alert variant="success" className="mt-3">
          Job posted successfully!
        </Alert>
      )}
    </Container>
  );
}

export default PostJob;
