const TopHiringCompaniesCard = ({ company }) => {
  const { name, jobPosts } = company;

  return (
    <div className="col-md-4 mb-4">
      <div className="hiring-company p-3 border rounded text-center">
        <p>{name}</p>
        <p>{jobPosts} Job posts</p>
      </div>
    </div>
  );
};

export default TopHiringCompaniesCard;
