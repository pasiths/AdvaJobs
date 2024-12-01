import { useState, useEffect } from 'react';
import LatestAdvertisementCard from './LatestAdvertisementCard';
import TopHiringCompaniesCard from './TopHiringCompaniesCard';
import JobCategoriesCard from './JobCategoriesCard';

const JobPortalContent = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [hiringCompanies, setHiringCompanies] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setAdvertisements(data.advertisements); 
        setHiringCompanies(data.hiringCompanies); 
        setJobCategories(data.jobCategories);
      })
      .catch((error) => console.error('Error loading data:', error));
  }, []);

  return (
    <div className="container mt-5">
      {/* Premium Advertisements Section */}
      <section>
        <h3 className="mb-4">Latest Advertisements</h3>
        <div className="row">
          {advertisements.map((ad, index) => (
            <LatestAdvertisementCard key={index} advertisement={ad} />
          ))}
        </div>
      </section>

      {/* Top Hiring Companies Section */}
      <section className="mt-5">
        <h3 className="mb-4">Top Hiring Companies</h3>
        <div className="row">
          {hiringCompanies.map((company, index) => (
            <TopHiringCompaniesCard key={index} company={company} />
          ))}
        </div>
      </section>

      <section className="mt-5">
        <h3 className="mb-4">Job Categories</h3>
        <div className="row">
          {jobCategories.map((category, index) => (
            <JobCategoriesCard
              key={index}
              category={category.name}
              jobPosts={category.jobPosts}
            />
          ))}
        </div>
      </section>  
      <br />
      <br />
    </div>
  );
};

export default JobPortalContent;
