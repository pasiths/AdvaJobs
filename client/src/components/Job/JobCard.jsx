
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const JobCard = ({ job }) => {
  return (
    <Card className="p-3">
      <Row>
        <Col md={2}>
          <img
            src="https://via.placeholder.com/50"
            alt="company logo"
            className="img-fluid"
          />
        </Col>
        <Col md={10}>
          <h6>{job.title}</h6>
          <p className="mb-1">{job.company}</p>
          <small>{job.timeAgo}</small>
          <div className="d-flex justify-content-between mt-2">
            <small>{job.location}</small>
            <Link to="/jobdetail">View Details</Link>
          </div>
        </Col>
      </Row>
    </Card>
  );
};
JobCard.propTypes = {
  job: PropTypes.shape({
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    timeAgo: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
};

export default JobCard;