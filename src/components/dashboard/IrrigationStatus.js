import React from 'react';
import { Card, Row, Col, Badge, ProgressBar, Button } from 'react-bootstrap';
import { FaWater, FaExclamationTriangle, FaTint, FaSun, FaCloudRain } from 'react-icons/fa';

function IrrigationStatus() {
  // Mock irrigation data
  const irrigationZones = [
    {
      id: 1,
      name: 'North Field Tomatoes',
      currentMoisture: 28,
      optimalMoisture: { min: 40, max: 60 },
      status: 'under-irrigated',
      lastIrrigation: '2023-06-13',
      nextScheduled: '2023-06-16',
      weather: 'sunny'
    },
    {
      id: 2,
      name: 'West Field Corn',
      currentMoisture: 45,
      optimalMoisture: { min: 35, max: 55 },
      status: 'optimal',
      lastIrrigation: '2023-06-15',
      nextScheduled: '2023-06-18',
      weather: 'partly-cloudy'
    },
    {
      id: 3,
      name: 'South Field Wheat',
      currentMoisture: 68,
      optimalMoisture: { min: 30, max: 50 },
      status: 'over-irrigated',
      lastIrrigation: '2023-06-14',
      nextScheduled: null,
      weather: 'rainy'
    }
  ];

  // Get zone status
  const getZoneStatus = (zone) => {
    if (zone.status === 'under-irrigated') {
      return {
        text: 'Under-Irrigated',
        badge: <Badge bg="warning">Under-Irrigated</Badge>,
        icon: <FaExclamationTriangle className="text-warning" />,
        alert: 'Water levels are below optimal range. Consider scheduling irrigation soon.'
      };
    } else if (zone.status === 'over-irrigated') {
      return {
        text: 'Over-Irrigated',
        badge: <Badge bg="danger">Over-Irrigated</Badge>,
        icon: <FaExclamationTriangle className="text-danger" />,
        alert: 'Water levels are above optimal range. Hold irrigation until soil dries.'
      };
    } else {
      return {
        text: 'Optimal',
        badge: <Badge bg="success">Optimal</Badge>,
        icon: <FaWater className="text-success" />,
        alert: 'Water levels are within optimal range.'
      };
    }
  };

  // Get moisture indicator
  const getMoistureIndicator = (zone) => {
    const { currentMoisture, optimalMoisture } = zone;
    let variant;
    
    if (currentMoisture < optimalMoisture.min) {
      variant = 'warning';
    } else if (currentMoisture > optimalMoisture.max) {
      variant = 'danger';
    } else {
      variant = 'success';
    }
    
    return (
      <ProgressBar 
        variant={variant} 
        now={currentMoisture} 
        min={0}
        max={100}
        label={`${currentMoisture}%`}
      />
    );
  };

  // Get weather icon
  const getWeatherIcon = (weather) => {
    switch (weather) {
      case 'sunny':
        return <FaSun className="text-warning" size={24} />;
      case 'rainy':
        return <FaCloudRain className="text-primary" size={24} />;
      case 'partly-cloudy':
        return <FaCloudRain className="text-secondary" size={24} />;
      default:
        return <FaSun className="text-warning" size={24} />;
    }
  };

  return (
    <Card className="shadow-sm h-100">
      <Card.Header className="bg-white py-3">
        <h5 className="mb-0 fw-bold">Irrigation Status</h5>
      </Card.Header>
      <Card.Body>
        <Row className="g-4">
          {irrigationZones.map((zone) => {
            const status = getZoneStatus(zone);
            return (
              <Col md={4} key={zone.id}>
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h6 className="fw-bold mb-0">{zone.name}</h6>
                      {status.badge}
                    </div>
                    
                    <div className="mb-3">
                      <label className="d-flex justify-content-between">
                        <span>Current Soil Moisture</span>
                        <span className="text-muted">
                          Target: {zone.optimalMoisture.min}%-{zone.optimalMoisture.max}%
                        </span>
                      </label>
                      {getMoistureIndicator(zone)}
                    </div>
                    
                    <div className="mb-3">
                      <p className="mb-2 d-flex align-items-center">
                        {status.icon}
                        <span className="ms-2 small">{status.alert}</span>
                      </p>
                    </div>
                    
                    <Row className="g-3 text-center">
                      <Col xs={4}>
                        <div className="small text-muted mb-1">Weather</div>
                        <div>{getWeatherIcon(zone.weather)}</div>
                      </Col>
                      <Col xs={4}>
                        <div className="small text-muted mb-1">Last Watered</div>
                        <div className="small fw-bold">{zone.lastIrrigation || 'N/A'}</div>
                      </Col>
                      <Col xs={4}>
                        <div className="small text-muted mb-1">Next Scheduled</div>
                        <div className="small fw-bold">{zone.nextScheduled || 'N/A'}</div>
                      </Col>
                    </Row>
                    
                    <div className="mt-3 d-grid">
                      {zone.status === 'under-irrigated' ? (
                        <Button variant="primary" size="sm">Irrigate Now</Button>
                      ) : (
                        <Button variant="outline-primary" size="sm">Manage Schedule</Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
        
        <div className="mt-4">
          <h6 className="fw-bold mb-3">Water Usage Summary</h6>
          <Row className="g-3">
            <Col md={4}>
              <Card className="border-0 bg-light">
                <Card.Body className="p-3">
                  <div className="d-flex align-items-center">
                    <FaTint className="text-primary me-3" size={24} />
                    <div>
                      <h6 className="mb-0">Today's Usage</h6>
                      <h4 className="mb-0 fw-bold">124 gallons</h4>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 bg-light">
                <Card.Body className="p-3">
                  <div className="d-flex align-items-center">
                    <FaTint className="text-primary me-3" size={24} />
                    <div>
                      <h6 className="mb-0">Weekly Usage</h6>
                      <h4 className="mb-0 fw-bold">876 gallons</h4>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 bg-light">
                <Card.Body className="p-3">
                  <div className="d-flex align-items-center">
                    <FaTint className="text-success me-3" size={24} />
                    <div>
                      <h6 className="mb-0">Water Savings</h6>
                      <h4 className="mb-0 fw-bold">12% <small className="text-success">↓</small></h4>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
}

export default IrrigationStatus;