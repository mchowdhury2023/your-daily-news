import React, { useContext } from 'react';
import { Container, Paper, Box, Typography, Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/editprofile');
  };

  if (!user) {
    return <Typography>Loading...</Typography>; // Or handle the logged out state
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ py: 5, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar src={user?.photoURL || "/static/images/avatar/1.jpg"} sx={{ width: 150, height: 150, mb: 2 }} />
        <Typography variant="h5" sx={{ mb: 1 }}><span style={{ fontWeight: 'bold' }}>Name: </span> 
          {user?.displayName}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}><span style={{ fontWeight: 'bold' }}>Email: </span>
          {user?.email}
        </Typography>
        <Button variant="outlined" onClick={handleEditClick} sx={{ mt: 2 }}>
          Edit Profile
        </Button>
      </Paper>
    </Container>
  );
};

export default MyProfile;
