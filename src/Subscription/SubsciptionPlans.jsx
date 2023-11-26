// SubscriptionPlans.js

import React from 'react';
import { Container, Grid } from '@mui/material';
import SubscriptionCard from './SubscriptionCard';

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
  return (
    <Container>
    <Grid container justifyContent="center" alignItems="stretch" spacing={4} sx={{ py: 4 }}>
      {subscriptionPlans.map((plan, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <SubscriptionCard plan={plan} index={index} />
        </Grid>
      ))}
    </Grid>
  </Container>
  );
};

export default SubscriptionPlans;
