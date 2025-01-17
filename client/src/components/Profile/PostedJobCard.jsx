import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PostedJobCard = ({ jobTitle, postedDate, location }) => {
  return (
    <Card className="mb-3 shadow-sm" style={{ backgroundColor: '#ffffff', borderRadius: '8px' }}>
      <Card.Body className="d-flex align-items-center justify-content-between">
        <div>
          <h6 className="mb-1" style={{ color: '#144B7D' }}>{jobTitle}</h6>
          <small style={{ color: '#555' }}>Posted: {postedDate}</small>
        </div>
        <div className="text-end">
          <small style={{ color: '#888' }}>{location}</small><br />
          <Link to="/jobdetail" className="text-primary" style={{ fontWeight: '500' }}>VIEW JOB</Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PostedJobCard;
