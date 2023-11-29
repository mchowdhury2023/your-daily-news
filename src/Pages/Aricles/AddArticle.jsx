import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import Select from 'react-select';
import { TextField, Button, FormControl, InputLabel, Select as MuiSelect, MenuItem, Grid, Paper, Container } from '@mui/material';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const AddArticle = () => {
  const { register, handleSubmit, reset, control } = useForm();
  const { user } = useContext(AuthContext);
  const tagsOptions = [{ value: 'news', label: 'News' }, { value: 'sports', label: 'Sports' }, { value: 'politics', label: 'politics' }, { value: 'Tech', label: 'Tech' }];

  const axiosPublic = useAxiosPublic();
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const { data: publishers, error, isLoading } = useQuery({
    queryKey: ['publishers'],
    queryFn: () => axiosPublic.get('/publishers').then(res => res.data),
    
});

if (isLoading) {
    return <div>Loading publishers...</div>;
}

if (error) {
    console.error('Error fetching publishers:', error);
    return <div>Error loading publishers.</div>;
}

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
          const articleData = {
              title: data.title,
              image: imageResponse.data.data.display_url,
              publisher: data.publisher,
              tags: data.tags.map(tag => tag.value),
              description: data.description,
              authorName: user.displayName || 'Anonymous',
              authorEmail: user.email,
              authorPhotoURL: user.photoURL || 'No Photo',
              postedDate: new Date().toISOString(),
              status: 'pending', 
              isPremium: 'no' 
          };

          const articleResponse = await axiosPublic.post('/addArticles', articleData);

          if (articleResponse.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.title} is added to the News Articles.`,
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
            <h2 style={{ textAlign:'center' }}>Add Article</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Title"
                fullWidth
                margin="normal"
                {...register('title', { required: true })}
              />

              <FormControl fullWidth margin="normal">
                <InputLabel>Publisher</InputLabel>
                <MuiSelect {...register('publisher', { required: true })}>
                  {publishers.map((publisher) => (
                    <MenuItem key={publisher._id} value={publisher.name}>
                      {publisher.name}
                    </MenuItem>
                  ))}
                </MuiSelect>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => <Select {...field} options={tagsOptions} isMulti />}
                />
              </FormControl>

              <TextField
                label="Description"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                {...register('description')}
              />

              <input {...register('image', { required: true })} type="file" style={{ marginTop: "10px" }} />

              <Button type="submit" variant="contained" color="primary" style={{ marginTop: "20px" }}>
                Submit Article
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddArticle;
