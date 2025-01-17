import { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Filter from '../components/Job/Filter';
import JobCard from '../components/Job/JobCard';

const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(false);
  const [filters, setFilters] = useState({
    time: 'Newest First',
    salary: '',
    jobType: '',
    location: '',
  });
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const jobsPerPage = 12; // Number of jobs per page

  useEffect(() => {
    // Fetch jobs from API
    fetch('/api/jobs/jobs')
      .then((response) => response.json())
      .then((data) => {
        setJobs(data); // Set the jobs state with the fetched data
        setFilteredJobs(data); // Initially show all jobs
      })
      .catch((error) => console.error('Error loading jobs:', error));
  }, []);

  useEffect(() => {
    // Apply the filters whenever the filter values change
    let filtered = [...jobs]; // Use a copy to avoid modifying the original state

    // Filter by time
    if (filters.time === 'Newest First') {
      filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filters.time === 'Oldest First') {
      filtered = filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    // Filter by salary
    if (filters.salary) {
      const [minSalary, maxSalary] = filters.salary.split('-').map(Number);
      filtered = filtered.filter((job) => {
        const jobSalary = parseFloat(job.salary); // Parse salary from the job
        return jobSalary >= minSalary && (maxSalary ? jobSalary <= maxSalary : true);
      });
    }

    // Filter by job type
    if (filters.jobType) {
      filtered = filtered.filter((job) => job.jobType === filters.jobType);
    }

    // Filter by location (In country filter)
    if (selectedLocation) {
      filtered = filtered.filter((job) => job.location.toLowerCase().includes('in the country'));
    }

    setFilteredJobs(filtered);
  }, [filters, selectedLocation, jobs]); // Run whenever filters, location, or jobs change

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update current page when the user navigates
  };

  // Calculate the jobs to be shown for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="container mt-4" style={{ minHeight: '100vh' }}>
      <Row>
        {/* Filters Section */}
        <Col md={3}>
          <Filter
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            onFilterChange={handleFilterChange}
            filters={filters} // Pass the current filters to the Filter component
          />
        </Col>

        {/* Job Listings Section */}
        <Col md={9}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p>Showing {currentJobs.length} of {filteredJobs.length} Results</p>

            {/* Pagination buttons at the top */}
            <div>
              <Button
                variant="light"
                className="me-1"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {'<'}
              </Button>
              <Button
                variant="light"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                {'>'}
              </Button>
            </div>
          </div>

          <Row>
            {currentJobs.map((job, index) => (
              <Col md={6} key={index} className="mb-4">
                <JobCard job={job} />
              </Col>
            ))}
          </Row>

          {/* Pagination buttons below */}
          <div className="d-flex justify-content-center mt-4">
            <Button
              variant="light"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {'<'}
            </Button>
            <Button
              variant="light"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              {'>'}
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default JobPage;
