import React, { useState } from 'react';
import { TextField, Button, Alert, Typography, Card, CardContent, Container, Grid } from '@mui/material';
import axios from 'axios';
import useAxiosPublic from '../../hooks/useAxiosPublic';

function WeatherForm() {
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [weather, setWeather] = useState(null);

  const axiosPublic = useAxiosPublic();

  const handleChange = (event) => {
    setLocation(event.target.value);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const match = location.match(/^[a-zA-Z]+, [a-zA-Z]+$/);
    if (!match) {
      setError('Please enter a valid format (city, country)');
      return;
    }
    try {
      const response = await axiosPublic.post('/getWeather', { location });
      setWeather(response.data);
      setError('');
    } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Failed to fetch weather data');
    }
  };

  return (
    <Container>
        <Typography variant="h4" align="center" sx={{ mt: 6, mb: 2 }}>
        Enter your City name and Country to get weather Info
      </Typography>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
                        <TextField
                            label="Enter Location (City, Country)"
                            variant="outlined"
                            value={location}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                            Get Weather
                        </Button>
                    </form>
                    {error && <Alert severity="error">{error}</Alert>}
                    {weather && (
                <Grid item xs={12}>
                    <Grid container justifyContent="center">
                        <Grid item xs={12} md={8} lg={6}> {/* Adjust md and lg sizes as needed */}
                            <Card variant="outlined" style={{ marginTop: '20px' }}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        Weather in {weather.name}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Temperature: {(weather.main.temp - 273.15).toFixed(2)} °C
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        Weather: {weather.weather[0].main}
                                        <br />
                                        Description: {weather.weather[0].description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            )}
                </Grid>
            </Grid>
        </Container>
  );
}

export default WeatherForm;
