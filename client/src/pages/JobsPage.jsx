import  { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Filter from '../components/Job/Filter';
import JobCard from '../components/Job/JobCard';

const JobPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(false);

  const jobs = new Array(12).fill({
    title: 'JOB TITLE',
    company: 'Company Name',
    timeAgo: '2 hours ago',
    location: 'Location',
  });

  return (
    <div className="container mt-4">
      <Row>
        {/* Filters Section */}
        <Col md={3}>
          <Filter
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        </Col>

        {/* Job Listings Section */}
        <Col md={9}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p>Showing 12 Results from 21</p>
            <div>
              <Button variant="light" className="me-1">{'<'}</Button>
              <Button variant="light">{'>'}</Button>
            </div>
          </div>

          <Row>
            {jobs.map((job, index) => (
              <Col md={6} key={index} className="mb-4">
                <JobCard job={job} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default JobPage;
