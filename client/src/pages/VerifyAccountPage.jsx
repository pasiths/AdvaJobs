import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

const VerifyAccount = () => {
    const [otp, setOtp] = useState(new Array(6).fill(''));

    // Handle OTP input
    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Move focus to the next input field
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="text-center" style={{ maxWidth: '600px' }}>
                <h2 className="mb-4">Verify Your Account</h2>

                <p className="mb-4">
                    We E-mailed you a six digit code (OTP) to your email.
                    <br />
                    Enter the code below to confirm your E-mail Address
                </p>

                {/* OTP Input Fields */}
                <Row className="mb-4 justify-content-center">
                    {otp.map((data, index) => (
                        <Col xs={2} key={index}>
                            <Form.Control
                                type="text"
                                maxLength="1"
                                className="text-center p-2"
                                style={{ fontSize: '2rem', border: '1px solid #ccc' }}
                                value={data}
                                onChange={(e) => handleOtpChange(e.target, index)}
                                onFocus={(e) => e.target.select()}
                            />
                        </Col>
                    ))}
                </Row>

                {/* Verify Button */}
                <Button
                    variant="primary"
                    className="w-100 p-3 mb-3"
                    style={{ backgroundColor: '#144B7D', border: 'none' }}
                >
                    Verify Now
                </Button>

                {/* Resend OTP */}
                <p>
                    OTP not received? <a href="#" className="text-primary">Resend</a>
                </p>
            </div>
        </Container>
    );
};

export default VerifyAccount;
