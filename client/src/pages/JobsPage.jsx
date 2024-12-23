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
  const [currentPage, setCurrentPage] = useState(1);  // Track current page
  const jobsPerPage = 12;  // Number of jobs per page

  useEffect(() => {
    // Fetch jobs from JSON
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setJobs(data.jobs); // Assuming "jobs" is the key in your JSON
        setFilteredJobs(data.jobs); // Initially show all jobs
      })
      .catch((error) => console.error('Error loading jobs:', error));
  }, []);

  useEffect(() => {
    // Apply the filters whenever the filter values change
    let filtered = jobs;

    // Filter by time
    if (filters.time === 'Oldest First') {
      filtered = filtered.sort((a, b) => new Date(a.timeAgo) - new Date(b.timeAgo));
    }

    // Filter by salary
    if (filters.salary) {
      const [minSalary, maxSalary] = filters.salary.split('-').map(Number);
      filtered = filtered.filter(
        (job) => {
          const [minJobSalary, maxJobSalary] = job.salary.split(' - ').map((s) => parseInt(s.replace('LKR', '').replace(',', '').trim()));
          return minJobSalary >= minSalary && maxJobSalary <= maxSalary;
        }
      );
    }

    // Filter by job type
    if (filters.jobType) {
      filtered = filtered.filter((job) => job.jobType === filters.jobType);
    }

    // Filter by location (In country filter)
    if (selectedLocation && filters.location) {
      filtered = filtered.filter((job) => job.location.includes(filters.location));
    }

    setFilteredJobs(filtered);
  }, [filters, selectedLocation, jobs]); // Run whenever filters or location change

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
            filters={filters} // Passing the current filters to Filter component
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
