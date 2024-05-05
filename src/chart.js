import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


const RealtimeGraph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const xValues = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
    const yValues = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];

    const chartData = {
      labels: xValues,
      datasets: [{
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: yValues
      }]
    };

    if (chartRef.current) {
      const ctx = chartRef.current.chartInstance.ctx;
      new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
          // Add your custom options here
        }
      });
    }
  }, []);

  return <Line ref={chartRef} />;
};

export default RealtimeGraph;
