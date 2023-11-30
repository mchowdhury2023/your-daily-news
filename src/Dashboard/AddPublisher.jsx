import React from 'react';
import { useForm } from "react-hook-form";
import { TextField, Button, Grid, Paper, Container } from '@mui/material';
import Swal from 'sweetalert2';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAxiosSecure from '../hooks/useAxiosSecure';

const AddPublisher = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('image', data.image[0]);

    try {
      const imageResponse = await axiosPublic.post(image_hosting_api, formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      });

      if (imageResponse.data.success) {
          const publisherData = {
              name: data.name,
              image: imageResponse.data.data.display_url
          };

          const publisherResponse = await axiosSecure.post('/addpublisher', publisherData);

          if (publisherResponse.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} has been added as a Publisher.`,
                showConfirmButton: false,
                timer: 1500
              });
          }
      }
    } catch (error) {
      console.error(error);
      // TODO: Handle error
    }
  };

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center" style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Grid item xs={12} md={8}>
          <Paper style={{ padding: "20px" }}>
            <h2 style={{ textAlign:'center' }}>Add Publisher</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Publisher Name"
                fullWidth
                margin="normal"
                {...register('name', { required: true })}
              />

              <input {...register('image', { required: true })} type="file" style={{ marginTop: "10px" }} />

              <Button type="submit" variant="contained" color="primary" style={{ marginTop: "20px" }}>
                Submit Publisher
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddPublisher;
