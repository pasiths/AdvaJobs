import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const JobApplicationPage = () => {
  const { jobId } = useParams(); // Retrieve the job ID from the URL parameters
  const [isApplied, setIsApplied] = useState(false); // Track application status
  const [job, setJob] = useState(null); // Store job data
  const [loading, setLoading] = useState(true); // Track loading status

  // Fetch job details from the API
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`/api/jobs/jobs/${jobId}`); // Replace with your API endpoint
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  // Handle the Apply button click
  const handleApplyClick = () => {
    setIsApplied(true);
  };

  if (loading) {
    return <p>Loading job details...</p>;
  }

  if (!job) {
    return <p>Job not found.</p>;
  }

  return (
    <Container className="mt-5">
      <Row>
        {/* Left Section - Job Details and Form */}
        <Col md={8}>
          <h2 className="mb-4">{`${job.title} | ${job.jobType} `}</h2>
          <h2 className="mb-4">{` ${job.company_Name}`}</h2>

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
              style={{ backgroundColor: '#E0F2FF', border: 'none' }}
            />
          </Form.Group>

          {/* Apply Button or Success Message */}
          {!isApplied ? (
            <Button variant="primary" className="w-100 p-2" onClick={handleApplyClick}>
              APPLY NOW
            </Button>
          ) : (
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
          <Card className="p-4 rounded" style={{ backgroundColor: '#E7F1FF' }}>
            <h4 className="text-center">{`${job.title} | ${job.jobType}`}</h4>
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
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default JobApplicationPage;
