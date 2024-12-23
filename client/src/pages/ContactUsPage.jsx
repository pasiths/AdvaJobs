import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ContactUs = () => {
    const [name, setName] = useState("");  // Track Name
    const [email, setEmail] = useState("");  // Track Email
    const [subject, setSubject] = useState("");  // Track Subject
    const [message, setMessage] = useState("");  // Track Message

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        console.log('Message Sent:', { name, email, subject, message });
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '80vh', backgroundColor: '#f9f9f9', padding: '40px 0' }}
        >
            <Row className="w-100" style={{ maxWidth: '800px' }}>
                <Col className="p-5 bg-white rounded shadow-sm">
                    <h2 className="text-center mb-4" style={{ color: '#144B7D' }}>
                        Contact Us
                    </h2>
                    <p className="text-center mb-4">
                        Got questions or feedback? Fill out the form below, and we&#39;ll get back to you as soon as possible.
                    </p>
                    <Form onSubmit={handleSubmit}>
                        {/* Name Field */}
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your full name"
                                className="p-3"
                                style={{ backgroundColor: '#E0F2FF', border: 'none' }}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        {/* Email Field */}
                        <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                className="p-3"
                                style={{ backgroundColor: '#E0F2FF', border: 'none' }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        {/* Subject Field */}
                        <Form.Group className="mb-3">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter subject"
                                className="p-3"
                                style={{ backgroundColor: '#E0F2FF', border: 'none' }}
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </Form.Group>

                        {/* Message Field */}
                        <Form.Group className="mb-4">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Type your message here"
                                className="p-3"
                                style={{ backgroundColor: '#E0F2FF', border: 'none' }}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </Form.Group>

                        {/* Submit Button */}
                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100 p-3"
                            style={{ backgroundColor: '#144B7D', border: 'none' }}
                        >
                            Send Message
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ContactUs;
