// SubscriptionPlans.js

import React, { useContext } from 'react';
import { Container, Grid } from '@mui/material';
import SubscriptionCard from './SubscriptionCard';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosPublic from '../hooks/useAxiosPublic';

const subscriptionPlans = [
  {
    name: 'Premium Individual',
    price: '$9.99',
    features: [
      '1 premium account',
      'Cancel Anytime',
      '1 month free trial available'
    ],
  },
  {
    name: 'Premium Duo',
    price: '$12.99',
    features: [
      '2 premium accounts',
      'Cancel Anytime',
      '2 months free trial available'
    ],
  },
  {
    name: 'Premium Family',
    price: '$14.99',
    features: [
      '6 premium accounts',
      'Cancel Anytime',
      'Family plan available'
    ],
  },
];

  const SubscriptionPlans = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
  
    const updateUserMembership = async (status, taken) => {
      axiosPublic.patch(`/updatesubscription/${user.email}`, { membershipStatus: status, membershipTaken: taken })
        .then(response => {
          // Handle successful update
          console.log('Membership updated:', response.data);
        })
        .catch(error => {
          // Handle error
          console.error('Error updating membership:', error);
        });
    };

  return (
    <Container>
    <Grid container justifyContent="center" alignItems="stretch" spacing={4} sx={{ py: 4 }}>
      {subscriptionPlans.map((plan, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <SubscriptionCard plan={plan} index={index} updateUserMembership={updateUserMembership} />
        </Grid>
      ))}
    </Grid>
  </Container>
  );
};

export default SubscriptionPlans;
