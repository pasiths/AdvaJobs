import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LatestAdvertisementCard = ({ advertisement }) => {
  const { title, companyName, location, logoUrl, postedAt } = advertisement;

  return (
    <div className="col-md-4 mb-4">
      <div className="premium-ad p-3 border rounded text-center">
        <img
          src={logoUrl || 'https://via.placeholder.com/50'}
          alt={`${companyName} Logo`}
          className="mb-2"
        />
        <h5>{title}</h5>
        <p>{companyName}</p>
        <p>{location}</p>
        <Link to="/jobdetail" className="text-primary unstyled-link">
          VIEW DETAILS
        </Link>
        <p>{postedAt}</p>
      </div>
    </div>
  );
};
LatestAdvertisementCard.propTypes = {
  advertisement: PropTypes.shape({
    title: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    logoUrl: PropTypes.string,
    postedAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default LatestAdvertisementCard;
