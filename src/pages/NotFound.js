import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Container className="py-5 text-center">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <img 
            src="/404.png" 
            alt="Page Not Found" 
            className="img-fluid mb-4" 
            style={{ maxHeight: '300px' }}
          />
          <h1 className="display-4 fw-bold mb-3">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="lead mb-4">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Button as={Link} to="/" variant="primary" size="lg">
            Go to Homepage
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;