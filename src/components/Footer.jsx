import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
    return (
        <footer className="bg-dark text-light py-3">
            <Container>
                <Row>
                    <Col md={9}>
                        <p>&copy; 2023 HipHip12</p>
                    </Col>
                    <Col md={6} lg={3} className="text-right">
                        <p>Contact: example@example.com</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;