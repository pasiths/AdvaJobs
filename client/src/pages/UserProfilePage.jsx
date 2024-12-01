import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import JobCard from '../components/Profile/AppliedJobCard'; // Assuming the JobCard component is created.

const UserProfile = ({ userData }) => {
    const [profileData] = useState(userData || {
        full_name: 'John Doe',
        email: 'johndoe@example.com',
        location: 'New York, USA',
        phone_num: '+1 234 567 890',
        gender: 'Male',
        profile_pic: 'https://via.placeholder.com/150', // Example profile picture URL
    });

    const appliedJobs = [
        {
            jobTitle: 'Software Engineer',
            companyName: 'Google',
            timeAgo: '2 hours ago',
            location: 'Mountain View, CA',
        },
        {
            jobTitle: 'Product Manager',
            companyName: 'Amazon',
            timeAgo: '1 day ago',
            location: 'Seattle, WA',
        },
        {
            jobTitle: 'Data Scientist',
            companyName: 'Facebook',
            timeAgo: '3 days ago',
            location: 'Menlo Park, CA',
        },
    ];

    return (
        <Container
            fluid
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '80vh', backgroundColor: '#f9f9f9' }}
        >
            <Row className="w-100" style={{ maxWidth: '1200px' }}>
                {/* Left Side - My Details */}
                <Col
                    md={5}
                    className="p-5 bg-white rounded shadow-sm"
                    style={{ borderRadius: '10px', marginRight: '20px' }}
                >
                    {/* Profile Picture */}
                    <div className="text-center mb-4">
                        <img
                            src={profileData.profile_pic}
                            alt="Profile"
                            style={{
                                width: '150px',
                                height: '150px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '3px solid #144B7D',
                            }}
                        />
                    </div>

                    {/* Full Name */}
                    <h2 className="text-center mb-4" style={{ color: '#144B7D' }}>
                        {profileData.full_name}
                    </h2>

                    {/* User Details */}
                    <div style={{ lineHeight: '2', fontSize: '1.1rem' }}>
                        <p>
                            <strong>Full Name:</strong> {profileData.full_name}
                        </p>
                        <p>
                            <strong>Email:</strong> {profileData.email}
                        </p>
                        <p>
                            <strong>Location:</strong> {profileData.location}
                        </p>
                        <p>
                            <strong>Phone:</strong> {profileData.phone_num}
                        </p>
                        <p>
                            <strong>Gender:</strong> {profileData.gender}
                        </p>
                    </div>

                    <Button
                        variant="primary"
                        className="w-100 mt-4"
                        style={{
                            backgroundColor: '#144B7D',
                            border: 'none',
                        }}
                    >
                        Edit Profile
                    </Button>
                </Col>

                {/* Right Side - Applied Job History */}
                <Col
                    md={6}
                    className="p-5 bg-white rounded shadow-sm"
                    style={{ borderRadius: '10px' }}
                >
                    <h4 className="text-center mb-4" style={{ color: '#144B7D' }}>
                        Applied Job History
                    </h4>
                    {appliedJobs.map((job, idx) => (
                        <JobCard
                            key={idx}
                            jobTitle={job.jobTitle}
                            companyName={job.companyName}
                            timeAgo={job.timeAgo}
                            location={job.location}
                        />
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export default UserProfile;
