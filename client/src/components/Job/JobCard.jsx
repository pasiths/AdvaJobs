import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const JobCard = ({ job }) => {
  return (
    <Card className="p-3">
      <Row>
        <Col md={10}>
          <h6>{job.title}</h6>
          <p className="mb-1">{job.company_Name}</p>
          <small>{new Date(job.createdAt).toLocaleDateString()}</small>
          <div className="d-flex justify-content-between mt-2">
            <small>{job.location}</small>
            {/* Updated the Link path to include jobId */}
            <Link to={`/jobs/${job.id}`}>View Details</Link>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

JobCard.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.number.isRequired, // Added job.id validation
    title: PropTypes.string.isRequired,
    company_Name: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
};

export default JobCard;
