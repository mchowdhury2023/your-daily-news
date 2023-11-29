// CheckoutForm.js

import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Button, Box, Typography } from '@mui/material';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const CheckoutForm = ({ price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axiosPublic.post('/create-payment-intent', { price })
      .then((response) => {
        setClientSecret(response.data.clientSecret);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      
      return;
    }

    const card = elements.getElement(CardElement)

    if (card === null){
        return
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          // Add billing details here
        },
      },
    });

    if (result.error) {
      // Show error to customer
      setErrorMessage(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        // The payment is processed or not authorized. Redirect to a success page.
        console.log('Payment succeeded');
      }
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <CardElement 
                 options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
        />
        <Button type="submit" disabled={!stripe}>
          Pay ${price}
        </Button>
        {errorMessage && (
          <Typography color="error">{errorMessage}</Typography>
        )}
      </form>
    </Box>
  );
};

export default CheckoutForm;
