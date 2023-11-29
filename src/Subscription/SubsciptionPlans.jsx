// SubscriptionPlans.js

import React, { useContext, useState } from 'react';
import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';
import SubscriptionCard from './SubscriptionCard';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import BannerSlider from './BannerSlider';
import { useNavigate } from 'react-router-dom';

const subscriptionPlans = [
  {
    name: 'Premium Individual',
    price: '$9.99/mo',
    features: [
      '1 premium account',
      'Cancel Anytime',
      'Duration 1 Minute'
    ],
  },
  {
    name: 'Premium Duo',
    price: '$12.99/mo',
    features: [
      '2 premium accounts',
      'Cancel Anytime',
      'Duration 5 Days'
    ],
  },
  {
    name: 'Premium Family',
    price: '$14.99/mo',
    features: [
      '6 premium accounts',
      'Cancel Anytime',
      'Duration 10 Days'
    ],
  },
];

  const SubscriptionPlans = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

  
    const updateUserMembership = async (status, taken) => {
      try {

        const response = await axiosPublic.patch(`/updatesubscription/${user.email}`, { membershipStatus: status, membershipTaken: taken });
      
        // Check if the update was successful
        if (response.data.modifiedCount > 0 ) {
        
          // Show success alert
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your subscription has been added. You are a premium member now.",
            showConfirmButton: false,
            timer: 1500,
          });
        }

      }
    
        catch(error) {
        
          console.error('Error updating membership:', error);
        };
    };

    const [selectedDuration, setSelectedDuration] = useState('');

    const handleDurationChange = (event) => {
      setSelectedDuration(event.target.value);
    };
  
    const handleGetSubscription = () => {
      updateUserMembership('premium', selectedDuration);
      const prices = { 60: 9.99, 7200: 12.99, 14400: 14.99 };
    const price = prices[selectedDuration];

    
    navigate('/payment', { state: { price } });
    };

    

  return (
    <Container>
       <BannerSlider></BannerSlider>
       
     
      <Typography variant="h5" align="center" sx={{ mt: 4, mb: 2 }}>
        Choose your Subscription from the following plan
    </Typography>
    <Grid container justifyContent="center" alignItems="stretch" spacing={4} sx={{ py: 4 }}>
      {subscriptionPlans.map((plan, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <SubscriptionCard plan={plan} index={index} updateUserMembership={updateUserMembership} />
        </Grid>
      ))}
    </Grid>
    <Typography variant="h5" align="center" sx={{ mt: 4, mb: 2 }}>
        To Get Subscriptiopn Select Your Duration
    </Typography>
    <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
  
        <InputLabel>Subscription Duration</InputLabel>
        <Select
          value={selectedDuration}
          label="Subscription Duration"
          onChange={handleDurationChange}
        >
          <MenuItem value={60}>1 Minute</MenuItem>
          <MenuItem value={7200}>5 Days</MenuItem>
          <MenuItem value={14400}>10 Days</MenuItem>
        </Select>
      </FormControl>

      {/* Button to Get Subscription */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleGetSubscription}
        disabled={!selectedDuration}
      >
        Get Subscription
      </Button>
  </Container>
  );
};

export default SubscriptionPlans;
