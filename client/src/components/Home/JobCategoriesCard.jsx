const JobCategoriesCard = ({ category, jobPosts }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="job-category p-3 border rounded text-center">
        <p>{category}</p>
        <p>{jobPosts} Job posts</p>
      </div>
    </div>
  );
};

export default JobCategoriesCard;
