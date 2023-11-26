import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const borderColors = ['#778899','#FFA07A', '#20B2AA'];

const SubscriptionCard = ({ plan, index }) => {
  const borderColor = borderColors[index % borderColors.length]; // Cycle through border colors

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
      <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: 2 }}>
        <Button variant="contained" color="primary">
          Get Subscription
        </Button>
      </Box>
    </Card>
  );
};

export default SubscriptionCard;
