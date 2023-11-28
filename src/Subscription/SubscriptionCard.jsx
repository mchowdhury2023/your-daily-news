import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const borderColors = ['#778899','#FFA07A', '#20B2AA'];

const SubscriptionCard = ({ plan, index}) => {

  const borderColor = borderColors[index % borderColors.length]; 

  // const handleSubscription = () => {
  //   // Example durations for different plans
  //   const durations = {
  //     'Premium Individual': 60,
  //     'Premium Duo': 300,
  //     'Premium Family': 480
  //   };

  //   const selectedDuration = durations[plan.name];
  //   updateUserMembership( 'premium', selectedDuration);
  // };

  return (
    <Card raised sx={{ 
        height: '100%', 
        borderColor: borderColor, 
        borderWidth: '2px', 
        borderStyle: 'solid',
        '&:hover': {
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
          <Typography variant="h5" component="div">
            {plan.name}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {plan.price}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          {plan.features.map((feature, featureIndex) => (
            <Typography key={featureIndex} component="li" sx={{ listStyleType: 'none', paddingBottom: 1 }}>
              {feature}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
