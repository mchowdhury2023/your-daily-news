import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SubscriptionModal = ({ open, handleClose }) => {
    const navigate = useNavigate();

    const handleOkClick = () => {
        handleClose(); // Close the modal
        navigate('/subscription'); // Navigate to the subscription page
      };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: 20 }}>
        <Typography variant="h6">Special Subscription Offer!!</Typography>
        <Typography style={{ marginTop: 10 }}>Subscribe now to get exclusive benefits!</Typography>
        <Button style={{ marginTop: 20 }} onClick={handleOkClick}>OK</Button>
        <Button style={{ marginTop: 20 }} onClick={handleClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default SubscriptionModal;
