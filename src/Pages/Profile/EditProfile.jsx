import React, { useState, useEffect, useContext } from "react";
import { updateProfile } from "firebase/auth";
import { Container, Paper, TextField, Button, Typography, Avatar, Grid } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const EditProfile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, photoURL } = formData;

    try {
      // Update Firebase profile
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      // Update user state in context
      updateUser({
        ...user,
        displayName: name,
        photoURL: photoURL,
      });

      // Update backend database
      const response = await axiosPublic.patch(`/users/${user.email}`, {
        name: name,
        photoURL: photoURL,
      });

      if (response.data.modifiedCount > 0) {
        toast.success("Profile updated successfully");
        navigate("/myprofile");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ p: 3, mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} src={formData.photoURL}>
          {/* Icon or image */}
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                required
                fullWidth
                id="name"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={formData.email}
                disabled // Email cannot be edited
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="photoURL"
                fullWidth
                id="photoURL"
                label="Photo URL (optional)"
                value={formData.photoURL}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save Changes
          </Button>
        </form>
      </Paper>
      <ToastContainer />
    </Container>
  );
};

export default EditProfile;
