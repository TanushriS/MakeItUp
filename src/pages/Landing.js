import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaLeaf, FaChartLine, FaCloudSun, FaShieldAlt } from 'react-icons/fa';

function Landing() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-gradient text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">Intelligent Crop Observation & Forecast System</h1>
              <p className="lead mb-4">
                AgriSense uses real-time sensor data and machine learning to help farmers monitor crops, 
                predict growth patterns, detect diseases, and optimize irrigation.
              </p>
              <div className="d-flex gap-3">
                <Button
                  as={Link}
                  to="/register"
                  variant="light"
                  size="lg"
                  className="fw-bold"
                >
                  Get Started
                </Button>
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-light"
                  size="lg"
                >
                  Login
                </Button>
              </div>
            </Col>
            <Col lg={6} className="mt-5 mt-lg-0 text-center">
              <img 
                src="/hero-image.png" 
                alt="Smart Agriculture" 
                className="img-fluid rounded-3 shadow"
                style={{ maxHeight: '400px' }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold">Our Features</h2>
          <Row className="g-4">
            <Col md={6} lg={3}>
              <Card className="h-100 border-0">
                <Card.Body className="text-center p-4">
                  <div className="mb-4 text-center">
                    <FaLeaf className="text-green" size={48} />
                  </div>
                  <Card.Title className="fw-bold">Real-time Monitoring</Card.Title>
                  <Card.Text>
                    Track soil moisture, humidity, temperature, and visual crop data in real-time.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="h-100 border-0">
                <Card.Body className="text-center p-4">
                  <div className="mb-4 text-center">
                    <FaChartLine className="text-green" size={48} />
                  </div>
                  <Card.Title className="fw-bold">Growth Prediction</Card.Title>
                  <Card.Text>
                    Use machine learning to predict crop growth patterns and yield estimates.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="h-100 border-0">
                <Card.Body className="text-center p-4">
                  <div className="mb-4 text-center">
                    <FaCloudSun className="text-green" size={48} />
                  </div>
                  <Card.Title className="fw-bold">Disease Detection</Card.Title>
                  <Card.Text>
                    Early identification of crop diseases using image recognition and pattern analysis.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="h-100 border-0">
                <Card.Body className="text-center p-4">
                  <div className="mb-4 text-center">
                    <FaShieldAlt className="text-green" size={48} />
                  </div>
                  <Card.Title className="fw-bold">Irrigation Optimization</Card.Title>
                  <Card.Text>
                    Smart alerts for over-irrigation or under-irrigation to optimize water usage.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-light py-5">
        <Container className="text-center">
          <h2 className="fw-bold mb-4">Ready to transform your farming?</h2>
          <p className="lead mb-4">
            Join thousands of farmers who are using AgriSense to increase yield and reduce costs.
          </p>
          <Button
            as={Link}
            to="/register"
            variant="primary"
            size="lg"
            className="px-4 py-2"
          >
            Start Free Trial
          </Button>
        </Container>
      </section>
    </>
  );
}

export default Landing;