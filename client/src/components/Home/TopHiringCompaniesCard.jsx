const TopHiringCompaniesCard = ({ company }) => {
  const { name, jobPosts, logoUrl } = company;

  return (
    <div className="col-md-4 mb-4">
      <div className="hiring-company p-3 border rounded text-center">
        <img
          src={logoUrl || 'https://via.placeholder.com/50'}
          alt={`${name} Logo`}
          className="mb-2"
        />
        <p>{name}</p>
        <p>{jobPosts} Job posts</p>
      </div>
    </div>
  );
};

export default TopHiringCompaniesCard;
