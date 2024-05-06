import React, { useState, useEffect } from 'react';
import axios from 'axios';


const LineGraph = ({ data, label }) => {
  // Find the minimum and maximum y-values in the data
  const minY = Math.min(...data.map(point => point.y));
  const maxY = Math.max(...data.map(point => point.y));

  // Calculate the scaling factors to fit the data within the graph's height and width
  const scaleX = 450 / (data.length - 1); // Decreased the width to leave space for labels
  const scaleY = 100 / (maxY - minY); // Decreased the height to leave space for labels

  // Generate SVG path data for the line
  const pathData = data.map((point, index) => {
    const x = index * scaleX;
    const y = 100 - (point.y - minY) * scaleY; // Adjusted y-value based on scaling
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="graph-container">
      <div className="graph">
        <h3>{label}</h3>
        <div className="line-graph">
          <svg viewBox="0 0 500 100"> {/* Decreased height of viewBox to 100 */}
            {/* Render the line using path element */}
            <path fill="none" stroke="blue" strokeWidth="2" d={`M${pathData}`} />
          </svg>
        </div>
      </div>
    </div>
  );
};


const HomePage = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [ecData, setEcData] = useState([]);
  const [ppmData, setPpmData] = useState([]);
  const [phData, setPhData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://aquaponic-api-bb5761772d00.herokuapp.com/api/v1/irrigationMonitor', {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          }
        });
        const apiData = response.data.data;

        const formattedTemperatureData = apiData.map(item => ({
          x: new Date(item.created_at).toLocaleTimeString(),
          y: parseFloat(item.temp)
        }));
        setTemperatureData(formattedTemperatureData);

        const formattedEcData = apiData.map(item => ({
          x: new Date(item.created_at).toLocaleTimeString(),
          y: parseFloat(item.ec)
        }));
        setEcData(formattedEcData);

        const formattedPpmData = apiData.map(item => ({
          x: new Date(item.created_at).toLocaleTimeString(),
          y: parseFloat(item.ppm)
        }));
        setPpmData(formattedPpmData);

        const formattedPhData = apiData.map(item => ({
          x: new Date(item.created_at).toLocaleTimeString(),
          y: parseFloat(item.ph)
        }));
        setPhData(formattedPhData);

        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.'); // Set error message
        setLoading(false); // Set loading to false if there's an error
      }
    };

    // Fetch data initially
    fetchData();

    // Fetch new data every 10 seconds
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {loading && <p>Loading data...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <div className="grid-container">
          <div className="top-left">
            <LineGraph data={temperatureData} label="Temperature (°F)" />
            <p>{temperatureData.length > 0 && `Latest: ${temperatureData[temperatureData.length - 1].y} °F`}</p>
          </div>
          <div className="top-right">
            <LineGraph data={ecData} label="EC" />
            <p>{ecData.length > 0 && `Latest: ${ecData[ecData.length - 1].y}`}</p>
          </div>
          <div className="bottom-left">
            <LineGraph data={ppmData} label="PPM" />
            <p>{ppmData.length > 0 && `Latest: ${ppmData[ppmData.length - 1].y}`}</p>
          </div>
          <div className="bottom-right">
            <LineGraph data={phData} label="pH" />
            <p>{phData.length > 0 && `Latest: ${phData[phData.length - 1].y}`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
