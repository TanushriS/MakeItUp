import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-light py-4 mt-auto">
      <Container>
        <Row className="justify-content-between align-items-center">
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} AgriSense - Intelligent Crop Observation & Forecast System
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end mt-3 mt-md-0">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <a href="#" className="text-decoration-none text-secondary">Privacy Policy</a>
              </li>
              <li className="list-inline-item mx-3">
                <a href="#" className="text-decoration-none text-secondary">Terms of Service</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-decoration-none text-secondary">Contact</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;