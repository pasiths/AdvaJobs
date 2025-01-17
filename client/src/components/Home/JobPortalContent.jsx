import { useState, useEffect } from "react";
import LatestAdvertisementCard from "./LatestAdvertisementCard";
import TopHiringCompaniesCard from "./TopHiringCompaniesCard";
import JobCategoriesCard from "./JobCategoriesCard";

const JobPortalContent = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [hiringCompanies, setHiringCompanies] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);

  useEffect(() => {
    // Fetch the latest jobs from the API
    fetch("/api/jobs/jobs")
      .then((response) => response.json())
      .then((data) => {
        // Sort by created date and get the latest 6
        const latestJobs = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);
        setAdvertisements(latestJobs);
      })
      .catch((error) => console.error("Error loading job data:", error));

    // Example data for hiringCompanies and jobCategories
    setHiringCompanies([
      { name: "Company A", jobPosts: 20 },
      { name: "Company B", jobPosts: 15 },
    ]);

    setJobCategories([
      { name: "IT", jobPosts: 50 },
      { name: "Engineering", jobPosts: 30 },
    ]);
  }, []);

  return (
    <div className="container mt-5">
      {/* Latest Advertisements Section */}
      <section>
        <h3 className="mb-4">Latest Advertisements</h3>
        <div className="row">
          {advertisements.map((ad) => (
            <LatestAdvertisementCard key={ad.id} advertisement={ad} />
          ))}
        </div>
      </section>

      {/* Top Hiring Companies Section */}
      {/* <section className="mt-5">
        <h3 className="mb-4">Top Hiring Companies</h3>
        <div className="row">
          {hiringCompanies.map((company, index) => (
            <TopHiringCompaniesCard key={index} company={company} />
          ))}
        </div>
      </section> */}

      {/* <section className="mt-5">
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
      </section> */}
    </div>
  );
};

export default JobPortalContent;
