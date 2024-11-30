import { useState } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        location: '',
        phone_num: '',
        gender: '',
        profile_pic: null,
        cv: null,
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [validationError, ] = useState('');

    // Handle input change (placeholder implementation)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission (placeholder implementation)
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate a registration process
        setTimeout(() => {
            setLoading(false);
            console.log(formData);
        }, 2000);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="w-100" style={{ maxWidth: '800px' }}>
                <h2 className="text-center mb-4">Register</h2>
                <br />

                {/* Registration Form */}
                <Form onSubmit={handleSubmit} noValidate>
                    {/* Name Input */}
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Control
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="p-3"
                            style={{ backgroundColor: '#E0F2FF', border: 'none' }}
                            required
                        />
                    </Form.Group>

                    {/* Email Input */}
                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="p-3"
                            style={{ backgroundColor: '#E0F2FF', border: 'none' }}
                            required
                        />
                    </Form.Group>

                    {/* Home Town Input */}
                    <Form.Group controlId="formHomeTown" className="mb-3">
                        <Form.Control
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Home Town"
                            className="p-3"
                            style={{ backgroundColor: '#E0F2FF', border: 'none' }}
                        />
                    </Form.Group>

                    {/* Phone Input */}
                    <Form.Group controlId="formPhone" className="mb-3">
                        <Form.Control
                            type="text"
                            name="phone_num"
                            value={formData.phone_num}
                            onChange={handleChange}
                            placeholder="Phone"
                            className="p-3"
                            style={{ backgroundColor: '#E0F2FF', border: 'none' }}
                        />
                    </Form.Group>

                    {/* Gender Radio Options */}
                    <Form.Group className="mb-3">
                        <Form.Label>Gender:</Form.Label>
                        <div>
                            <Form.Check
                                inline
                                label="Male"
                                name="gender"
                                type="radio"
                                id="gender-male"
                                value="Male"
                                checked={formData.gender === 'Male'}
                                onChange={handleChange}
                                required
                            />
                            <Form.Check
                                inline
                                label="Female"
                                name="gender"
                                type="radio"
                                id="gender-female"
                                value="Female"
                                checked={formData.gender === 'Female'}
                                onChange={handleChange}
                                required
                            />
                            <Form.Check
                                inline
                                label="Other"
                                name="gender"
                                type="radio"
                                id="gender-other"
                                value="Other"
                                checked={formData.gender === 'Other'}
                                onChange={handleChange}
                            />
                        </div>
                    </Form.Group>

                    {/* Profile Picture and CV Upload */}
                    <Row>
                        <Col>
                            <Form.Group controlId="formProfilePicture" className="mb-3">
                                <Form.Label>Profile Picture:</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="profile_pic"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="p-2"
                                    style={{ backgroundColor: '#E0F2FF', border: 'none' }}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formCV" className="mb-3">
                                <Form.Label>CV:</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="cv"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleChange}
                                    className="p-2"
                                    style={{ backgroundColor: '#E0F2FF', border: 'none' }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Password Input */}
                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="p-3"
                            style={{ backgroundColor: '#E0F2FF', border: 'none' }}
                            required
                            isInvalid={formData.password.length > 0 && formData.password.length < 8}
                        />
                        <Form.Control.Feedback type="invalid">
                            Password must be at least 8 characters long.
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            Password should be comprised of at least 8 characters
                        </Form.Text>
                    </Form.Group>

                    {/* Confirm Password Input */}
                    <Form.Group controlId="formConfirmPassword" className="mb-3">
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            className="p-3"
                            style={{ backgroundColor: '#E0F2FF', border: 'none' }}
                            required
                            isInvalid={formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                            Passwords do not match.
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Create Account Button */}
                    <Button
                        type="submit"
                        variant="primary"
                        className="w-100 p-3"
                        style={{ backgroundColor: '#144B7D', border: 'none' }}
                        disabled={loading || validationError !== ''}
                    >
                        {loading ? (
                            <>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                {' Registering...'}
                            </>
                        ) : (
                            'CREATE ACCOUNT'
                        )}
                    </Button>
                </Form>

                {/* Sign In Section */}
                <div className="text-center mt-4">
                    <p className="text-muted">
                        Already have an Account? <a href="/login" className="text-primary">Sign In</a>
                    </p>
                </div>
            </div>
        </Container>
    );
};

export default RegisterForm;
