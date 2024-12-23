import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // If you're using React Router

const NotFoundPage = () => {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}
    >
      <Row className="text-center" style={{ maxWidth: '600px' }}>
        <Col>
          <h1 style={{ fontSize: '100px', fontWeight: 'bold', color: '#dc3545' }}>
            404
          </h1>
          <h3>Oops! The page you are looking for doesn&E39;t exist.</h3>
          <p className="mb-4">
            The page you were trying to reach might have been moved or deleted.
          </p>
          <Link to="/">
            <Button variant="primary" size="lg">
              Go to Homepage
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
