import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spinner } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { FaThermometerHalf, FaWater, FaCloud, FaLeaf } from 'react-icons/fa';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function SensorData({ farmId }) {
  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!farmId) return;

    setLoading(true);
    
    try {
      // Query for the latest sensor data
      const q = query(
        collection(db, `farms/${farmId}/sensorData`),
        orderBy('timestamp', 'desc'),
        limit(24) // Get last 24 hours of data
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate() || new Date()
          });
        });
        
        // Reverse to get chronological order
        setSensorData(data.reverse());
        setLoading(false);
      }, (err) => {
        console.error('Error fetching sensor data:', err);
        setError('Failed to load sensor data');
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error('Error setting up sensor data listener:', err);
      setError('Failed to connect to sensor data');
      setLoading(false);
    }
  }, [farmId]);

  // Mock data for demonstration
  const getMockData = () => {
    const labels = [];
    const tempData = [];
    const moistureData = [];
    const humidityData = [];
    
    const now = new Date();
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now);
      time.setHours(now.getHours() - i);
      labels.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      
      // Generate slightly varied mock data
      tempData.push(22 + Math.random() * 8);
      moistureData.push(55 + Math.random() * 15);
      humidityData.push(60 + Math.random() * 20);
    }
    
    return {
      labels,
      datasets: [
        {
          label: 'Temperature (°C)',
          data: tempData,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.1)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Soil Moisture (%)',
          data: moistureData,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.1)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Humidity (%)',
          data: humidityData,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.1)',
          fill: true,
          tension: 0.4
        }
      ]
    };
  };

  const getLatestReadings = () => {
    // Use real data if available, otherwise use mock data
    if (sensorData && sensorData.length > 0) {
      const latest = sensorData[sensorData.length - 1];
      return {
        temperature: latest.temperature,
        soilMoisture: latest.soilMoisture,
        humidity: latest.humidity,
        leafWetness: latest.leafWetness || 0
      };
    }
    
    // Mock values
    return {
      temperature: 26.5,
      soilMoisture: 62.3,
      humidity: 71.8,
      leafWetness: 0.4
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20
        }
      }
    }
  };

  if (loading) {
    return (
      <Card className="shadow-sm h-100">
        <Card.Body className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-sm h-100">
        <Card.Body className="text-center" style={{ minHeight: '400px' }}>
          <p className="text-danger mt-5">{error}</p>
          <p>Please check your sensor connection and try again.</p>
        </Card.Body>
      </Card>
    );
  }

  const latestReadings = getLatestReadings();
  const chartData = getMockData();

  return (
    <Card className="shadow-sm h-100">
      <Card.Header className="bg-white py-3">
        <h5 className="mb-0 fw-bold">Real-time Sensor Data</h5>
      </Card.Header>
      <Card.Body>
        <Row className="g-4 mb-4">
          <Col xs={6} md={3}>
            <Card className="border-0 bg-light h-100">
              <Card.Body className="p-3">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <FaThermometerHalf size={24} className="text-danger" />
                  </div>
                  <div>
                    <h6 className="mb-0">Temperature</h6>
                    <h4 className="mb-0 fw-bold">{latestReadings.temperature.toFixed(1)}°C</h4>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col xs={6} md={3}>
            <Card className="border-0 bg-light h-100">
              <Card.Body className="p-3">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <FaWater size={24} className="text-primary" />
                  </div>
                  <div>
                    <h6 className="mb-0">Soil Moisture</h6>
                    <h4 className="mb-0 fw-bold">{latestReadings.soilMoisture.toFixed(1)}%</h4>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col xs={6} md={3}>
            <Card className="border-0 bg-light h-100">
              <Card.Body className="p-3">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <FaCloud size={24} className="text-info" />
                  </div>
                  <div>
                    <h6 className="mb-0">Humidity</h6>
                    <h4 className="mb-0 fw-bold">{latestReadings.humidity.toFixed(1)}%</h4>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col xs={6} md={3}>
            <Card className="border-0 bg-light h-100">
              <Card.Body className="p-3">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <FaLeaf size={24} className="text-success" />
                  </div>
                  <div>
                    <h6 className="mb-0">Leaf Wetness</h6>
                    <h4 className="mb-0 fw-bold">{(latestReadings.leafWetness * 100).toFixed(0)}%</h4>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <div style={{ height: '300px' }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </Card.Body>
    </Card>
  );
}

export default SensorData;