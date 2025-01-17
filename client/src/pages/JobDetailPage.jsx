import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const JobDetail = () => {
  const { jobId } = useParams(); // Get jobId from the URL
  const [job, setJob] = useState(null);

  useEffect(() => {
    // Fetch the job details based on jobId
    fetch(`/api/jobs/jobs/${jobId}`)
      .then((response) => response.json())
      .then((data) => {
        setJob(data); // Set the fetched job data
      })
      .catch((error) => console.error('Error fetching job details:', error));
  }, [jobId]);

  if (!job) {
    return <Container className="mt-4">Loading job details...</Container>;
  }

  return (
    <Container className="mt-4">
      <Row>
        {/* Left side - Job Description */}
        <Col md={8}>
          <h2>{`${job.title} | ${job.jobType} `}</h2>
        </Col>
        <Col md={8}>
          <h2>{`${job.company_Name || 'Unknown Company'}`}</h2>
          <p className="mt-4">{job.description}</p>
          <hr></hr>
          <h5>Salary</h5>
          <p className="mt-4">Rs. {job.salary}</p>
        </Col>

        {/* Right side - Job Details and Apply Section */}
        <Col md={4}>
          <Card className="p-4 rounded" style={{ backgroundColor: '#E7F1FF' }}>
            <h4 className="text-center">{`${job.title} | ${job.jobType} `}</h4>
            <h5 className="text-center">{`${job.company_Name || 'Unknown Company'}`}</h5>
            <p className="text-center">
              {job.location || 'Location not specified'} <br />
              {job.jobType} <br />
              {Math.max(0, Math.ceil((new Date(job.closeDate) - new Date()) / (1000 * 60 * 60 * 24)))} Days Left
            </p>
            <hr />
            <p>{job.content}</p>
            <h5>Contact</h5>
            <p>
              {job.phone} <br />
              {job.email} <br />
              {job.company_Name || 'Unknown Company'}
            </p>
            <Link to={`/applypage/${job.id}`} className="text-primary">
              <Button variant="primary" className="w-100">Apply Now</Button>
            </Link>
          </Card>

          <Card className="mt-4 p-3">
            <h5 className="text-center">{job.company_Name || 'Unknown Company'}</h5>
            <div className="d-flex justify-content-between">
              <p>{job.location || 'Not specified'}</p>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default JobDetail;
