import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const JobDetail = () => {
  return (
    <Container className="mt-4">
      <Row>
        {/* Left side - Job Description */}
        <Col md={8}>
          <h2>UI/UX Engineer | Full Time | Google</h2>
          <p className="mt-4">
            We are looking for a talented UI/UX Engineer to join our team. You will collaborate closely with product managers, developers, and other designers to turn user insights into world-class designs. Your work will help create engaging and user-friendly interfaces that delight users and support the overall product vision.
          </p>

          <h5 className="mt-4">Key Responsibilities:</h5>
          <ul>
            <li>Collaborate with cross-functional teams to define, design, and implement innovative UI/UX solutions for web and mobile applications.</li>
            <li>Conduct user research, develop personas, create wireframes, prototypes, and high-fidelity designs.</li>
            <li>Ensure consistency and visual coherence across all platforms through thoughtful application of style guides, design systems, and best practices.</li>
            <li>Translate complex user requirements into clear and intuitive interfaces that enhance usability and accessibility.</li>
            <li>Conduct usability testing, gather feedback, and iterate on designs to continuously improve the user experience.</li>
            <li>Stay up-to-date with UI/UX trends, tools, and techniques, applying them to create cutting-edge designs.</li>
            <li>Work closely with frontend developers to ensure seamless integration of designs into the final product.</li>
          </ul>

          <h5 className="mt-4">Requirements:</h5>
          <ul>
            <li>Proven experience as a UI/UX Designer or Engineer with a portfolio that demonstrates your ability to design user-friendly interfaces and create engaging experiences.</li>
            <li>Proficiency in design tools such as Figma, Sketch, Adobe XD, or similar.</li>
            <li>Strong understanding of user-centered design principles, usability, and accessibility best practices.</li>
            <li>Experience with wireframing, prototyping, and user testing.</li>
            <li>Basic knowledge of front-end technologies (HTML, CSS, JavaScript) to collaborate effectively with developers.</li>
            <li>Excellent communication skills with the ability to present and explain design decisions clearly and persuasively.</li>
            <li>A keen eye for detail, with a focus on creating pixel-perfect designs.</li>
          </ul>

          <h5 className="mt-4">Nice to Have:</h5>
          <ul>
            <li>Experience designing for mobile platforms (iOS, Android) and responsive web design.</li>
            <li>Familiarity with Agile development processes.</li>
            <li>Knowledge of animation tools such as Principle or After Effects.</li>
          </ul>

          <h5 className="mt-4">Why Join Us?</h5>
          <ul>
            <li>Work on exciting, challenging projects with a global impact.</li>
            <li>Collaborate with a talented, passionate, and supportive team.</li>
            <li>Competitive salary and benefits package.</li>
            <li>Opportunities for career growth and professional development.</li>
            <li>Flexible working hours and a healthy work-life balance.</li>
          </ul>
        </Col>

        {/* Right side - Job Details and Apply Section */}
        <Col md={4}>
          <Card className="p-4 rounded" style={{ backgroundColor: '#E7F1FF' }}>
            <img
              src="https://via.placeholder.com/60"
              alt="company logo"
              className="mx-auto d-block mb-4"
            />
            <h4 className="text-center">UI/UX Engineer | Full Time | Google</h4>
            <p className="text-center">
              No 123, Vijerama Road Colombo 7 <br />
              Full Time <br />
              2 Days Left
            </p>
            <hr />
            <p>
              In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
            </p>
            <h5>Contact</h5>
            <p>
              +94 701234567 <br />
              +94 11234567 <br />
              companyname@gmail.com
            </p>
            <a href="/applypage" className="text-primary">
              <Button variant="primary" className="w-100">Apply Now</Button>
            </a>
            {/* <Button variant="primary" className="w-100">Apply Now</Button> */}
          </Card>

          <Card className="mt-4 p-3">
            <img
              src="https://via.placeholder.com/60"
              alt="company logo"
              className="mx-auto d-block mb-4"
            />
            <h5 className="text-center">Google</h5>
            <p className="text-center">120 Job Posts</p>
            <div className="d-flex justify-content-between">
              <p>Colombo 07</p>
              <p>1K - 2K Employees</p>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default JobDetail;