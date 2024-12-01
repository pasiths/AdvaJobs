import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AppliedJobCard = ({ jobTitle, companyName, timeAgo, location }) => {
  return (
    <Card className="mb-3 shadow-sm" style={{ backgroundColor: '#ffffff', borderRadius: '8px' }}>
      <Card.Body className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          {/* Placeholder for logo */}
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" 
            alt={companyName} 
            style={{ width: '50px', marginRight: '15px' }} 
          />
          <div>
            <h6 className="mb-1" style={{ color: '#144B7D' }}>{jobTitle}</h6>
            <small style={{ color: '#555' }}>{companyName}</small><br />
            <small style={{ color: '#888' }}>{timeAgo}</small>
          </div>
        </div>
        <div className="text-end">
          <small style={{ color: '#888' }}>{location}</small><br />
          <Link to="#" className="text-primary" style={{ fontWeight: '500' }}>VIEW DETAILS</Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AppliedJobCard;
