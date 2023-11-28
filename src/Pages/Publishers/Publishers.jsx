import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import useAxiosPublic from '../../hooks/useAxiosPublic';


const Publishers = () => {
  const [publishers, setPublishers] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    // Fetch publishers from the API
    axiosPublic.get('/publishers').then(response => {
      setPublishers(response.data);
    }).catch(error => console.error('Error fetching publishers:', error));
  }, [axiosPublic]);

  const boxStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '250px', // Set a fixed height
    padding: '15px',
    textAlign: 'center',
    overflow: 'hidden' // In case content is too large
  };

  return (
    <Box sx={{ flexGrow: 1, padding: '20px', marginLeft: '50px', marginRight: '50px' }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
        Publishers
      </Typography>
      <Grid container spacing={3}>
        {publishers.map((publisher) => (
          <Grid item xs={12} sm={6} md={4} key={publisher._id}>
            <Paper elevation={3} style={boxStyle}>
              <Typography variant="h6">{publisher.name}</Typography>
              <img src={publisher.image} alt={publisher.name} style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }} />
              {/* Add more publisher details here if needed */}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Publishers;
