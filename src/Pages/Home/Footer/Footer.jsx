import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Replace this with your actual logo import
// import logo from '../../assets/your-daily-news-logo.png'; 

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.600', 
        color: 'white',
        py: 2
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" justifyContent={{ xs: 'center', md: 'flex-start' }}>
              {/* Uncomment and use your logo */}
              {/* <img src={logo} alt="Your Daily News Logo" style={{ height: '70px', marginRight: '10px' }} /> */}
              <Typography variant="h6">
                Your Daily News
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-end' } }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }} textAlign={{ xs: 'center', md: 'right' }}>
              Follow us on:
            </Typography>
            <Box display="flex" gap={2} justifyContent={{ xs: 'center', md: 'flex-end' }} sx={{ mb: 2 }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            </Box>
            <Button
              color="inherit"
              component={Link}
              to="/testimonials"
              sx={{
                mt: 1,
                backgroundColor: 'lightblue',
                '&:hover': {
                  backgroundColor: 'blue',
                },
                color: 'white',
              }}
            >
              Feedback
            </Button>
          </Grid>
        </Grid>
        <Typography variant="caption" display="block" align="center" sx={{ mt: 2 }}>
          &copy; {new Date().getFullYear()} Your Daily News. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
