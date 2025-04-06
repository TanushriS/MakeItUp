import React, { useState } from 'react';
import { Card, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function GrowthPrediction() {
  const [selectedCrop, setSelectedCrop] = useState('tomato');
  const [selectedField, setSelectedField] = useState('north');
  const [loading, setLoading] = useState(false);
  
  // Mock crop types
  const cropTypes = [
    { value: 'tomato', label: 'Tomato' },
    { value: 'corn', label: 'Corn' },
    { value: 'wheat', label: 'Wheat' },
    { value: 'soybean', label: 'Soybean' }
  ];
  
  // Mock fields
  const fields = [
    { value: 'north', label: 'North Field' },
    { value: 'south', label: 'South Field' },
    { value: 'east', label: 'East Field' },
    { value: 'west', label: 'West Field' }
  ];

  const handleUpdatePrediction = () => {
    setLoading(true);
    
    // Simulate API call to get prediction data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Mock prediction data
  const getPredictionData = () => {
    // Different data based on crop type
    let predictedGrowth, actualGrowth, idealGrowth;
    
    if (selectedCrop === 'tomato') {
      predictedGrowth = [5, 12, 22, 35, 50, 68, 82, 90, 95, 98, 100];
      actualGrowth = [6, 14, 24, 37, 52, 70, null, null, null, null, null];
      idealGrowth = [8, 16, 28, 42, 58, 74, 86, 94, 98, 99, 100];
    } else if (selectedCrop === 'corn') {
      predictedGrowth = [3, 10, 20, 38, 55, 70, 85, 92, 97, 99, 100];
      actualGrowth = [4, 11, 22, 40, 58, 72, null, null, null, null, null];
      idealGrowth = [6, 14, 25, 44, 62, 76, 88, 94, 98, 99, 100];
    } else {
      predictedGrowth = [4, 11, 21, 37, 52, 69, 84, 91, 96, 98, 100];
      actualGrowth = [5, 12, 23, 39, 54, 71, null, null, null, null, null];
      idealGrowth = [7, 15, 26, 43, 60, 75, 87, 93, 97, 99, 100];
    }
    
    return {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11'],
      datasets: [
        {
          label: 'Predicted Growth',
          data: predictedGrowth,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderDash: [5, 5],
          fill: false
        },
        {
          label: 'Actual Growth',
          data: actualGrowth,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          pointRadius: 5,
          fill: false
        },
        {
          label: 'Ideal Growth',
          data: idealGrowth,
          borderColor: 'rgba(255, 159, 64, 1)',
          backgroundColor: 'rgba(255,,159, 64, 0.2)',
          borderWidth: 1,
          fill: false
        }
      ]
    };
  };

  // Mock yield prediction
  const getYieldPrediction = () => {
    if (selectedCrop === 'tomato') {
      return {
        predicted: 92,
        lastYear: 87,
        potential: 105
      };
    } else if (selectedCrop === 'corn') {
      return {
        predicted: 78,
        lastYear: 73,
        potential: 85
      };
    } else if (selectedCrop === 'wheat') {
      return {
        predicted: 65,
        lastYear: 61,
        potential: 72
      };
    } else {
      return {
        predicted: 54,
        lastYear: 50,
        potential: 60
      };
    }
  };

  // Mock time to harvest
  const getTimeToHarvest = () => {
    if (selectedCrop === 'tomato') {
      return {
        days: 42,
        expectedDate: '2023-07-28'
      };
    } else if (selectedCrop === 'corn') {
      return {
        days: 56,
        expectedDate: '2023-08-11'
      };
    } else if (selectedCrop === 'wheat') {
      return {
        days: 35,
        expectedDate: '2023-07-21'
      };
    } else {
      return {
        days: 49,
        expectedDate: '2023-08-04'
      };
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 105,
        title: {
          display: true,
          text: 'Growth Percentage (%)'
        }
      }
    },
    plugins: {
      title: {
        display: false,
        text: 'Crop Growth Prediction'
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      legend: {
        position: 'top',
      }
    }
  };

  const predictionData = getPredictionData();
  const yieldPrediction = getYieldPrediction();
  const timeToHarvest = getTimeToHarvest();

  return (
    <Card className="shadow-sm h-100">
      <Card.Header className="bg-white py-3">
        <h5 className="mb-0 fw-bold">Growth Prediction & Analysis</h5>
      </Card.Header>
      <Card.Body>
        <Row className="mb-4">
          <Col md={4} className="mb-3 mb-md-0">
            <Form.Group>
              <Form.Label>Crop Type</Form.Label>
              <Form.Select 
                value={selectedCrop} 
                onChange={(e) => setSelectedCrop(e.target.value)}
              >
                {cropTypes.map((crop) => (
                  <option key={crop.value} value={crop.value}>{crop.label}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <Form.Group>
              <Form.Label>Field Location</Form.Label>
              <Form.Select 
                value={selectedField} 
                onChange={(e) => setSelectedField(e.target.value)}
              >
                {fields.map((field) => (
                  <option key={field.value} value={field.value}>{field.label}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4} className="d-flex align-items-end">
            <Button 
              variant="primary" 
              className="w-100" 
              onClick={handleUpdatePrediction}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner 
                    as="span" 
                    animation="border" 
                    size="sm" 
                    role="status" 
                    aria-hidden="true" 
                    className="me-2"
                  />
                  Updating...
                </>
              ) : 'Update Prediction'}
            </Button>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <div style={{ height: '300px' }}>
              <Line data={predictionData} options={chartOptions} />
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="mb-3 mb-md-0">
            <Card className="border-0 bg-light h-100">
              <Card.Body className="p-3">
                <h6 className="fw-bold mb-3">Estimated Yield</h6>
                <Row>
                  <Col xs={4} className="text-center">
                    <h6 className="text-muted mb-1">Predicted</h6>
                    <h3 className="fw-bold mb-0">{yieldPrediction.predicted}</h3>
                    <p className="small mb-0">tons/hectare</p>
                  </Col>
                  <Col xs={4} className="text-center">
                    <h6 className="text-muted mb-1">Last Year</h6>
                    <h3 className="fw-bold mb-0">{yieldPrediction.lastYear}</h3>
                    <p className="small mb-0">tons/hectare</p>
                  </Col>
                  <Col xs={4} className="text-center">
                    <h6 className="text-muted mb-1">Potential</h6>
                    <h3 className="fw-bold mb-0">{yieldPrediction.potential}</h3>
                    <p className="small mb-0">tons/hectare</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="border-0 bg-light h-100">
              <Card.Body className="p-3">
                <h6 className="fw-bold mb-3">Time to Harvest</h6>
                <Row className="align-items-center">
                  <Col xs={6} className="text-center">
                    <h6 className="text-muted mb-1">Remaining Days</h6>
                    <h3 className="fw-bold mb-0">{timeToHarvest.days}</h3>
                    <p className="small mb-0">days</p>
                  </Col>
                  <Col xs={6} className="text-center">
                    <h6 className="text-muted mb-1">Expected Date</h6>
                    <h3 className="fw-bold mb-0">{timeToHarvest.expectedDate}</h3>
                    <p className="small mb-0">harvest day</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default GrowthPrediction;