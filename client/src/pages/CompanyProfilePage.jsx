import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import PostedJobCard from '../components/Profile/PostedJobCard'; // Replace with the actual component for posted job cards
import { Link } from 'react-router-dom';

const CompanyProfile = ({ companyData }) => {
    const [profileData] = useState(companyData || {
        company_name: 'Tech Solutions Inc.',
        email: 'info@techsolutions.com',
        location: 'Silicon Valley, USA',
        phone_num: '+1 987 654 3210',
        industry: 'Software Development',
        profile_pic: 'https://cdn.britannica.com/88/129488-050-6B1CA905/Internet-blue-screen-blog-society-history-media-2009.jpg', // Example profile picture URL
    });

    const postedJobs = [
        {
            jobTitle: 'Full Stack Developer',
            jobDescription: 'Build scalable web applications.',
            postedDate: '2025-01-15',
            location: 'Remote',
        },
        {
            jobTitle: 'UI/UX Designer',
            jobDescription: 'Design user-friendly interfaces.',
            postedDate: '2025-01-12',
            location: 'New York, NY',
        },
        {
            jobTitle: 'Project Manager',
            jobDescription: 'Manage cross-functional teams.',
            postedDate: '2025-01-10',
            location: 'Los Angeles, CA',
        },
    ];

    return (
        <Container
            fluid
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '80vh', backgroundColor: '#f9f9f9' }}
        >
            <Row className="w-100" style={{ maxWidth: '1200px' }}>
                {/* Left Side - Company Details */}
                <Col
                    md={5}
                    className="p-5 bg-white rounded shadow-sm"
                    style={{ borderRadius: '10px', marginRight: '20px' }}
                >
                    {/* Profile Picture */}
                    <div className="text-center mb-4">
                        <img
                            src={profileData.profile_pic}
                            alt="Company Logo"
                            style={{
                                width: '150px',
                                height: '150px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '3px solid #144B7D',
                            }}
                        />
                    </div>

                    {/* Company Name */}
                    <h2 className="text-center mb-4" style={{ color: '#144B7D' }}>
                        {profileData.company_name}
                    </h2>

                    {/* Company Details */}
                    <div style={{ lineHeight: '2', fontSize: '1.1rem' }}>
                        <p>
                            <strong>Company Name:</strong> {profileData.company_name}
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
                            <strong>Industry:</strong> {profileData.industry}
                        </p>
                    </div>

                    {/* Navigate to Edit Company Profile Page */}
                    <Button
                        className="btn btn-primary w-100 mt-4"
                        style={{ backgroundColor: '#144B7D', border: 'none' }}
                    >
                        Edit Company Details
                    </Button>
                </Col>

                {/* Right Side - Posted Job History */}
                <Col
                    md={6}
                    className="p-5 bg-white rounded shadow-sm"
                    style={{ borderRadius: '10px' }}
                >
                    <h4 className="text-center mb-4" style={{ color: '#144B7D' }}>
                        Posted Job History
                    </h4>
                    {postedJobs.map((job, idx) => (
                    <PostedJobCard
                        key={idx}
                        jobTitle={job.jobTitle}
                        postedDate={job.postedDate}
                        location={job.location}
                    />
                    ))}


                    {/* Post New Job Button */}
                    <div className="mt-4 text-center">
                        <Link to="/publishjob">
                            <Button
                                className="btn btn-success"
                                style={{ backgroundColor: '#28a745', border: 'none' }}
                            >
                                Post a New Job
                            </Button>
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default CompanyProfile;
