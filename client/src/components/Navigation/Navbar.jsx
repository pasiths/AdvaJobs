import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom

function NavScrollExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">SKILLED</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-auto my-2 my-lg-0" navbarScroll>
            {/* Use 'NavLink' instead of 'Nav.Link' */}
            <Nav.Link as={NavLink} to="/jobs">Jobs</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Contact Us</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {/* Profile icon as an example */}
            <Nav className="ms-auto">
              <Button as={NavLink} to="/companylogin" variant="outline-primary" className="me-2">Company Login</Button>
              <Button as={NavLink} to="/userlogin" variant="outline-success">Job Seeker Login</Button>
            </Nav>
            {/* <Nav.Link as={NavLink} to="/profile">
              Profile
              <i className="bi bi-person-circle ms-2" style={{ fontSize: '1.5rem' }}></i>
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
