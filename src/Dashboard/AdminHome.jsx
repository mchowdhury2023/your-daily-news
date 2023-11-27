import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import useAxiosPublic from '../hooks/useAxiosPublic';

const AdminHome = () => {
    const [chartData, setChartData] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
      // Fetch articles and process data
      axiosPublic.get('/articles') 
        .then(response => {
          const data = processArticleData(response.data);
          setChartData(data);
        })
        .catch(error => console.error(error));
    }, []);
  
    const processArticleData = (articles) => {
      const publisherCount = {};
      articles.forEach(article => {
        publisherCount[article.publisher] = (publisherCount[article.publisher] || 0) + 1;
      });
      const total = articles.length;
      return Object.entries(publisherCount).map(([publisher, count]) => [publisher, (count / total) * 100]);
    };

    // Chart data formatted for different chart types
    const formattedChartData = [['Publisher', 'Percentage'], ...chartData];

    return (
      <div>
        <h2>Publisher's Statistics</h2>
        <Chart
          chartType="PieChart"
          data={formattedChartData}
          width="100%"
          height="400px"
          options={{ title: 'Publisher Distribution in Articles (Pie Chart)' }}
        />
        <Chart
          chartType="BarChart"
          data={formattedChartData}
          width="100%"
          height="400px"
          options={{
            title: 'Publisher Distribution in Articles (Bar Chart)',
            chartArea: { width: '50%' },
            hAxis: {
              title: 'Percentage',
            },
            vAxis: {
              title: 'Publishers',
            },
          }}
        />
        <Chart
          chartType="ColumnChart"
          data={formattedChartData}
          width="100%"
          height="400px"
          options={{
            title: 'Publisher Distribution in Articles (Column Chart)',
            chartArea: { width: '50%' },
            hAxis: {
              title: 'Publishers',
            },
            vAxis: {
              title: 'Percentage',
            },
          }}
        />
      </div>
    );
};

export default AdminHome;
