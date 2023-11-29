import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const AdminHome = () => {

    const axiosPublic = useAxiosPublic();

    const processArticleData = (articles) => {
      const publisherCount = {};
      articles.forEach(article => {
        publisherCount[article.publisher] = (publisherCount[article.publisher] || 0) + 1;
      });
      const total = articles.length;
      return Object.entries(publisherCount).map(([publisher, count]) => [publisher, (count / total) * 100]);
    };

    const { data: chartData, error, isLoading } = useQuery({
      queryKey: ['articles'],
      queryFn: () => axiosPublic.get('/articles').then(res => processArticleData(res.data)),
    });
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      console.error("Error fetching articles:", error);
      return <div>Error loading articles.</div>;
    }
  
    

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
