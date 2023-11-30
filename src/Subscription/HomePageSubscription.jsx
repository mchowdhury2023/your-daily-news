import React from 'react';
import { Grid, Container, Typography } from '@mui/material';
import SubscriptionCard from './SubscriptionCard';

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

const HomePageSubscription = () => {
  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ mt: 4, mb: 4 }}>
        Our Subscription Plans
      </Typography>
      <Grid container justifyContent="center" alignItems="stretch" spacing={4}>
        {subscriptionPlans.map((plan, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <SubscriptionCard plan={plan} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePageSubscription;
