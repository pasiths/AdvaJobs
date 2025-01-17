import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom
import advajobs from "../../../src/assets/advajobs.svg";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

function NavScrollExample() {
  const [authToken, setAuthToken] = useState(null); // Initialize authToken as null
  const [cookies] = useCookies(["auth_token"]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading
  const [role, setRole] = useState(null);

  const decodeJWT = (auth_token) => {
    if (auth_token) {
      const [, payload] = auth_token.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload;
    }
    return null;
  };

  useEffect(() => {
    const tokenFromCookies = cookies.auth_token || null;
    setAuthToken(tokenFromCookies);
    setTimeout(() => setIsLoading(false), 500);

    if (tokenFromCookies) {
      const decodedToken = decodeJWT(tokenFromCookies);
      const role = decodedToken?.role;
      if (role === "company") {
        setRole(role);
      }
    }
  }, [cookies.auth_token]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary fixed-top shadow-sm ">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src={advajobs}
            alt="Logo"
            width="40"
            height="40"
            style={{ marginRight: "8px" }} // Adds spacing between the logo and text
          />
          AdvaJobs
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-auto my-2 my-lg-0" navbarScroll>
            {/* Use 'NavLink' instead of 'Nav.Link' */}
            <Nav.Link as={NavLink} to="/jobs">
              Jobs
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              Contact Us
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {/* Profile icon as an example */}
            {role ? (
              <Nav.Link as={NavLink} to="/cprofile">
                Profile
                <i
                  className="bi bi-person-circle ms-2"
                  style={{ fontSize: "1.5rem" }}
                ></i>
              </Nav.Link>
            ) : (
              <Nav.Link as={NavLink} to="/profile">
                Profile
                <i
                  className="bi bi-person-circle ms-2"
                  style={{ fontSize: "1.5rem" }}
                ></i>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
