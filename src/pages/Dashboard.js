import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Tabs, Tab } from 'react-bootstrap';
import { FaSeedling, FaChartLine, FaCloudSun } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import SensorData from '../components/dashboard/SensorData';
import DiseaseDetection from '../components/dashboard/DiseaseDetection';
import GrowthPrediction from '../components/dashboard/GrowthPrediction';
import IrrigationStatus from '../components/dashboard/IrrigationStatus';

function Dashboard() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedFarm, setSelectedFarm] = useState('farm1');

  // Mock farms data
  const farms = [
    { id: 'farm1', name: 'Main Farm' },
    { id: 'farm2', name: 'River Valley' }
  ];

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-1">Dashboard</h2>
              <p className="text-muted mb-0">
                Welcome back, {currentUser?.displayName || 'User'}
              </p>
            </div>
            <div className="d-flex align-items-center">
              <div className="me-3">
                <select 
                  className="form-select" 
                  value={selectedFarm} 
                  onChange={(e) => setSelectedFarm(e.target.value)}
                >
                  {farms.map(farm => (
                    <option key={farm.id} value={farm.id}>{farm.name}</option>
                  ))}
                </select>
              </div>
              <Button variant="primary">
                <FaSeedling className="me-1" /> Add Farm
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-3">
                <div 
                  className="d-flex align-items-center justify-content-center rounded-circle me-3 bg-success bg-opacity-10" 
                  style={{ width: '48px', height: '48px' }}
                >
                  <FaSeedling className="text-success" size={24} />
                </div>
                <div>
                  <h5 className="fw-bold mb-0">Crop Health</h5>
                  <p className="text-muted mb-0">Overall condition</p>
                </div>
              </div>
              <h2 className="display-5 fw-bold mb-0">92%</h2>
              <p className="text-success mb-0">
                <small>↑ 3% from last week</small>
              </p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-3">
                <div 
                  className="d-flex align-items-center justify-content-center rounded-circle me-3 bg-primary bg-opacity-10" 
                  style={{ width: '48px', height: '48px' }}
                >
                  <FaChartLine className="text-primary" size={24} />
                </div>
                <div>
                  <h5 className="fw-bold mb-0">Growth Rate</h5>
                  <p className="text-muted mb-0">Average across fields</p>
                </div>
              </div>
              <h2 className="display-5 fw-bold mb-0">85%</h2>
              <p className="text-primary mb-0">
                <small>↑ 5% from last week</small>
              </p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-3">
                <div 
                  className="d-flex align-items-center justify-content-center rounded-circle me-3 bg-warning bg-opacity-10" 
                  style={{ width: '48px', height: '48px' }}
                >
                  <FaCloudSun className="text-warning" size={24} />
                </div>
                <div>
                  <h5 className="fw-bold mb-0">Weather Impact</h5>
                  <p className="text-muted mb-0">Next 7 days forecast</p>
                </div>
              </div>
              <h2 className="display-5 fw-bold mb-0">Low</h2>
              <p className="text-warning mb-0">
                <small>3 days of light rain expected</small>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-4"
          >
            <Tab eventKey="overview" title="Overview">
              <Row className="g-4">
                <Col md={12} className="mb-4">
                  <SensorData farmId={selectedFarm} />
                </Col>
                <Col md={12} className="mb-4">
                  <DiseaseDetection />
                </Col>
                <Col md={12} className="mb-4">
                  <GrowthPrediction />
                </Col>
                <Col md={12}>
                  <IrrigationStatus />
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="sensor-data" title="Sensor Data">
              <SensorData farmId={selectedFarm} />
            </Tab>
            <Tab eventKey="disease-detection" title="Disease Detection">
              <DiseaseDetection />
            </Tab>
            <Tab eventKey="growth-prediction" title="Growth Prediction">
              <GrowthPrediction />
            </Tab>
            <Tab eventKey="irrigation" title="Irrigation Status">
              <IrrigationStatus />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;