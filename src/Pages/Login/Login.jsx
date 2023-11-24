import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import app from '../../Firebase/firebase.config';
//import axios from 'axios';
import { Box, TextField, Button, Typography, Container, Grid, Link } from '@mui/material';

const Login = () => {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const { signIn } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    await signIn(email, password)
      .then((result) => {
        // Handle successful login
        navigate(location?.state ? location?.state : '/')
      })
      .catch((error) => {
        if (error.code === "auth/invalid-login-credentials") {
          toast.error("Invalid login credentials. Please check your email and password.");
        } else {
          toast.error(error.message);
        }
      });
  };

  const handleSignInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider)
      .then((result) => {
        // Handle successful Google sign-in
        navigate(location?.state ? location?.state : '/')
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          {isNewUser ? 'Register' : 'Sign In'}
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isNewUser ? 'Register' : 'Login'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={(e) => {
                  e.preventDefault();
                  navigate('/register');
                }}>
                {isNewUser ? 'Already have an account? Sign in' : "Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          onClick={handleSignInWithGoogle}
          sx={{ mt: 3, mb: 2 }}
        >
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
