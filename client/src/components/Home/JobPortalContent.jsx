import LatestAdvertisementCard from './LatestAdvertisementCard';
import TopHiringCompaniesCard from './TopHiringCompaniesCard';
import JobCategoriesCard from './JobCategoriesCard';

const JobPortalContent = () => {
  return (
    <div className="container mt-5">
      {/* Premium Advertisements Section */}
      <section>
        <h3 className="mb-4">Latest Advertisements</h3>
        <div className="row">
          {[...Array(6)].map((_, index) => (
            <LatestAdvertisementCard key={index} />
          ))}
        </div>
      </section>

      {/* Top Hiring Companies Section */}
      <section className="mt-5">
        <h3 className="mb-4">Top Hiring Companies</h3>
        <div className="row">
          {[...Array(6)].map((_, index) => (
            <TopHiringCompaniesCard key={index} />
          ))}
        </div>
      </section>

      {/* Job Categories Section */}
      <section className="mt-5">
        <h3 className="mb-4">Job Categories</h3>
        <div className="row">
          {[...Array(9)].map((_, index) => (
            <JobCategoriesCard key={index} />
          ))}
        </div>
      </section>
      <br /><br />
    </div>
  );
};

export default JobPortalContent;
