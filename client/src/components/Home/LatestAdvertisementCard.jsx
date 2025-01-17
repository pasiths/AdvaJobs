import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LatestAdvertisementCard = ({ advertisement }) => {
  const { id, title, company_Name, location, createdAt } = advertisement;

  return (
    <div className="col-md-4 mb-4">
      <div className="premium-ad p-3 border rounded text-center">
        <h5>{title}</h5>
        <p>{company_Name}</p>
        <p>{location}</p>
        <Link to={`/jobs/${id}`} className="text-primary unstyled-link">
          VIEW DETAILS
        </Link>
        <p>{new Date(createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

LatestAdvertisementCard.propTypes = {
  advertisement: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    company_Name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default LatestAdvertisementCard;
