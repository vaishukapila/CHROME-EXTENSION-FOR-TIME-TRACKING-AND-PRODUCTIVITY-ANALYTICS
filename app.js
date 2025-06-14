import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://your-backend-url.replit.app/api/data')
      .then(res => setData(res.data));
  }, []);

  const productive = data.filter(d => d.category === 'productive').reduce((a, b) => a + b.timeSpent, 0);
  const unproductive = data.filter(d => d.category === 'unproductive').reduce((a, b) => a + b.timeSpent, 0);

  const chartData = {
    labels: ['Productive', 'Unproductive'],
    datasets: [{
      data: [productive, unproductive],
      backgroundColor: ['#4caf50', '#f44336']
    }]
  };

  return (
    <div style={{ width: 400, margin: 'auto', paddingTop: 50 }}>
      <h2>Weekly Productivity Report</h2>
      <Pie data={chartData} />
    </div>
  );
}

export default App;
