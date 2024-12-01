import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const Filter = ({ selectedLocation, setSelectedLocation, onFilterChange, filters }) => {
  const [selectedTime, setSelectedTime] = useState(filters.time || 'Newest First');
  const [selectedSalary, setSelectedSalary] = useState(filters.salary || '');
  const [selectedJobType, setSelectedJobType] = useState(filters.jobType || '');
  
  useEffect(() => {
    // Sync filter states with parent filters on initial load
    setSelectedTime(filters.time);
    setSelectedSalary(filters.salary);
    setSelectedJobType(filters.jobType);
  }, [filters]);

  const handleSalaryChange = (e) => {
    setSelectedSalary(e.target.value);
    onFilterChange('salary', e.target.value);
  };

  const handleJobTypeChange = (e) => {
    setSelectedJobType(e.target.value);
    onFilterChange('jobType', e.target.value);
  };

  return (
    <div>
      {/* Time Filter */}
      <div>
        <h5>Time</h5>
        <Form.Select
          value={selectedTime}
          onChange={(e) => {
            setSelectedTime(e.target.value);
            onFilterChange('time', e.target.value);
          }}
        >
          <option value="Newest First">Newest First</option>
          <option value="Oldest First">Oldest First</option>
        </Form.Select>
      </div>

      {/* Salary Filter */}
      <div className="mt-3">
        <h5>Salary</h5>
        <Form.Check
          type="radio"
          name="salary"
          label="0 LKR - 50,000 LKR"
          value="0-50000"
          checked={selectedSalary === '0-50000'}
          onChange={handleSalaryChange}
        />
        <Form.Check
          type="radio"
          name="salary"
          label="50,000 LKR - 100,000 LKR"
          value="50000-100000"
          checked={selectedSalary === '50000-100000'}
          onChange={handleSalaryChange}
        />
        <Form.Check
          type="radio"
          name="salary"
          label="100,000 LKR - 200,000 LKR"
          value="100000-200000"
          checked={selectedSalary === '100000-200000'}
          onChange={handleSalaryChange}
        />
        <Form.Check
          type="radio"
          name="salary"
          label="200,000 LKR - 500,000 LKR"
          value="200000-500000"
          checked={selectedSalary === '200000-500000'}
          onChange={handleSalaryChange}
        />
        <Form.Check
          type="radio"
          name="salary"
          label="500,000 LKR and Above"
          value="500000+"
          checked={selectedSalary === '500000+'}
          onChange={handleSalaryChange}
        />
      </div>

      {/* Job Type Filter */}
      <div className="mt-3">
        <h5>Job Type</h5>
        <Form.Check
          type="radio"
          name="jobType"
          label="Full-time"
          value="Full-time"
          checked={selectedJobType === 'Full-time'}
          onChange={handleJobTypeChange}
        />
        <Form.Check
          type="radio"
          name="jobType"
          label="Part-time"
          value="Part-time"
          checked={selectedJobType === 'Part-time'}
          onChange={handleJobTypeChange}
        />
        <Form.Check
          type="radio"
          name="jobType"
          label="Other"
          value="Other"
          checked={selectedJobType === 'Other'}
          onChange={handleJobTypeChange}
        />
      </div>

      {/* Location Filter */}
      <div className="mt-3">
        <h5>Location</h5>
        <Form.Check
          type="switch"
          id="location-switch"
          label="In the country"
          checked={selectedLocation}
          onChange={() => {
            setSelectedLocation(!selectedLocation);
            onFilterChange('location', !selectedLocation ? 'In the country' : '');
          }}
        />
      </div>
    </div>
  );
};
Filter.propTypes = {
  selectedLocation: PropTypes.bool.isRequired,
  setSelectedLocation: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    time: PropTypes.string,
    salary: PropTypes.string,
    jobType: PropTypes.string,
  }).isRequired,
};

export default Filter;