import React, { useState } from 'react';
import { Card, Row, Col, Button, Modal, Badge, ProgressBar } from 'react-bootstrap';
import { FaExclamationTriangle, FaCamera, FaEye } from 'react-icons/fa';

function DiseaseDetection() {
  const [showModal, setShowModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Mock disease detection alerts
  const diseaseAlerts = [
    {
      id: 1,
      cropType: 'Tomato',
      disease: 'Late Blight',
      confidence: 94,
      severity: 'High',
      location: 'North Field',
      date: '2023-06-15',
      imageUrl: '/tomato-blight.jpg',
      description: 'Late blight is a destructive disease of tomato and potato that can kill plants within days. It is caused by the fungal pathogen Phytophthora infestans.',
      recommendations: [
        'Apply fungicide immediately to prevent spread',
        'Isolate affected plants if possible',
        'Increase plant spacing for better air circulation',
        'Avoid overhead irrigation'
      ]
    },
    {
      id: 2,
      cropType: 'Wheat',
      disease: 'Powdery Mildew',
      confidence: 87,
      severity: 'Medium',
      location: 'East Field',
      date: '2023-06-12',
      imageUrl: '/wheat-mildew.jpg',
      description: 'Powdery mildew is a fungal disease that appears as a white powdery substance on the leaf surface. It affects plant growth and yield.',
      recommendations: [
        'Apply sulfur-based fungicide',
        'Maintain proper plant spacing',
        'Monitor environmental conditions',
        'Rotate crops in the next season'
      ]
    },
    {
      id: 3,
      cropType: 'Corn',
      disease: 'Northern Leaf Blight',
      confidence: 78,
      severity: 'Low',
      location: 'West Field',
      date: '2023-06-10',
      imageUrl: '/corn-blight.jpg',
      description: 'Northern corn leaf blight is a fungal disease that starts as small tan spots and develops into long, narrow lesions on corn leaves.',
      recommendations: [
        'Monitor disease progression',
        'Apply fungicide if disease spreads',
        'Plant resistant varieties next season',
        'Implement crop rotation practices'
      ]
    }
  ];

  const handleViewDetails = (alert) => {
    setSelectedAlert(alert);
    setShowModal(true);
  };

  const getSeverityBadge = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return <Badge bg="danger">High</Badge>;
      case 'medium':
        return <Badge bg="warning">Medium</Badge>;
      case 'low':
        return <Badge bg="success">Low</Badge>;
      default:
        return <Badge bg="secondary">{severity}</Badge>;
    }
  };

  const getConfidenceVariant = (confidence) => {
    if (confidence >= 90) return 'danger';
    if (confidence >= 70) return 'warning';
    return 'success';
  };

  return (
    <>
      <Card className="shadow-sm h-100">
        <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">Disease Detection</h5>
          <Button variant="outline-primary" size="sm">
            <FaCamera className="me-1" /> Scan Crop
          </Button>
        </Card.Header>
        <Card.Body>
          {diseaseAlerts.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted mb-0">No disease alerts detected.</p>
            </div>
          ) : (
            <div className="disease-alerts">
              {diseaseAlerts.map((alert) => (
                <Card key={alert.id} className="mb-3 border-0 shadow-sm">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col xs={12} md={2} className="mb-3 mb-md-0">
                        <div className="position-relative rounded overflow-hidden" style={{ height: '80px' }}>
                          <div 
                            className="w-100 h-100 bg-light d-flex justify-content-center align-items-center"
                            style={{ 
                              backgroundImage: `url(${alert.imageUrl})`, 
                              backgroundSize: 'cover',
                              backgroundPosition: 'center'
                            }}
                          >
                            {!alert.imageUrl && <FaCamera className="text-muted" size={24} />}
                          </div>
                        </div>
                      </Col>
                      <Col xs={12} md={7} className="mb-3 mb-md-0">
                        <div className="d-flex align-items-center mb-2">
                          <FaExclamationTriangle className="text-warning me-2" />
                          <h6 className="mb-0 fw-bold">{alert.cropType} - {alert.disease}</h6>
                        </div>
                        <div className="d-flex flex-wrap">
                          <div className="me-3 mb-2">
                            <small className="text-muted">Severity:</small> {getSeverityBadge(alert.severity)}
                          </div>
                          <div className="me-3 mb-2">
                            <small className="text-muted">Location:</small> {alert.location}
                          </div>
                          <div className="mb-2">
                            <small className="text-muted">Date:</small> {alert.date}
                          </div>
                        </div>
                        <div>
                          <small className="text-muted">Confidence:</small>
                          <ProgressBar 
                            variant={getConfidenceVariant(alert.confidence)}
                            now={alert.confidence} 
                            label={`${alert.confidence}%`} 
                            style={{ height: '8px' }}
                            className="mt-1"
                          />
                        </div>
                      </Col>
                      <Col xs={12} md={3} className="text-md-end">
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => handleViewDetails(alert)}
                        >
                          <FaEye className="me-1" /> View Details
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Disease Detail Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        {selectedAlert && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                <span className="fw-bold">{selectedAlert.cropType} - {selectedAlert.disease}</span>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={5}>
                  <div className="rounded overflow-hidden mb-3" style={{ maxHeight: '200px' }}>
                    <div 
                      className="w-100 h-100 bg-light d-flex justify-content-center align-items-center"
                      style={{ 
                        backgroundImage: `url(${selectedAlert.imageUrl})`, 
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '200px'
                      }}
                    >
                      {!selectedAlert.imageUrl && <FaCamera className="text-muted" size={48} />}
                    </div>
                  </div>
                  <div className="mb-3">
                    <h6 className="fw-bold">Detection Information</h6>
                    <ul className="list-unstyled">
                      <li><small className="text-muted">Severity:</small> {getSeverityBadge(selectedAlert.severity)}</li>
                      <li><small className="text-muted">Confidence:</small> {selectedAlert.confidence}%</li>
                      <li><small className="text-muted">Location:</small> {selectedAlert.location}</li>
                      <li><small className="text-muted">Detection Date:</small> {selectedAlert.date}</li>
                    </ul>
                  </div>
                </Col>
                <Col md={7}>
                  <div className="mb-3">
                    <h6 className="fw-bold">Description</h6>
                    <p>{selectedAlert.description}</p>
                  </div>
                  <div>
                    <h6 className="fw-bold">Recommendations</h6>
                    <ul>
                      {selectedAlert.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
              <Button variant="primary">Generate Report</Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
}

export default DiseaseDetection;