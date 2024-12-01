import { Link } from "react-router-dom";

const LatestAdvertisementCard = () => {
  return (
    <div className="col-md-4 mb-4">
      <div className="premium-ad p-3 border rounded text-center">
        <img
          src="https://via.placeholder.com/50"
          alt="Company Logo"
          className="mb-2"
        />
        <h5>JOB TITLE</h5>
        <p>Company Name</p>
        <p>Location</p>
        <Link to="/jobdetail" className="text-primary">
          VIEW DETAILS
        </Link>
        <p>2 hours ago</p>
      </div>
    </div>
  );
};

export default LatestAdvertisementCard;
