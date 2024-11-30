import { Form } from 'react-bootstrap';

const Filter = ({ selectedLocation, setSelectedLocation }) => {
  return (
    <div>
      <div>
        <h5>Time</h5>
        <Form.Select>
          <option>Newest First</option>
          <option>Oldest First</option>
        </Form.Select>
      </div>

      <div className="mt-3">
        <h5>Salary</h5>
        <Form.Check label="0 LKR - 50,000 LKR" />
        <Form.Check label="50,000 LKR - 100,000 LKR" />
        <Form.Check label="100,000 LKR - 200,000 LKR" />
        <Form.Check label="200,000 LKR - 500,000 LKR" />
        <Form.Check label="500,000 LKR and Above" />
      </div>

      <div className="mt-3">
        <h5>Job Type</h5>
        <Form.Check label="Full-time" />
        <Form.Check label="Part-time" />
        <Form.Check label="Other" />
      </div>

      <div className="mt-3">
        <h5>Location</h5>
        <Form.Check
          type="switch"
          id="location-switch"
          label="In the country"
          checked={selectedLocation}
          onChange={() => setSelectedLocation(!selectedLocation)}
        />
      </div>
    </div>
  );
};

export default Filter;
