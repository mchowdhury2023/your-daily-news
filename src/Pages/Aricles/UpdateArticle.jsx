import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  Grid,
  Paper,
  Container,
  Typography,
} from "@mui/material";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const UpdateArticle = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset, control, setValue } = useForm();
  const { user } = useContext(AuthContext);
  const [publishers, setPublishers] = useState([]);
  const tagsOptions = [
    { value: "news", label: "News" },
    { value: "sports", label: "Sports" },
    { value: "politics", label: "Politics" },
    { value: "tech", label: "Tech" },
  ];
  const axiosPublic = useAxiosPublic();
  const loadedArticle = useLoaderData();
  const [article, setArticle] = useState(null);

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  useEffect(() => {
    let articleData;

    axiosPublic
      .get("/publishers")
      .then((response) => {
        setPublishers(response.data);

        if (articleData) {
          const publisherName = response.data.find(
            (p) => p._id === articleData.publisher
          )?.name;
          setValue("publisher", publisherName || "");
        }
      })
      .catch((error) => console.error("Error fetching publishers:", error));

    axiosPublic
      .get(`/articles/${id}`)
      .then((response) => {
        setArticle(response.data);
        const articleData = response.data;
        setArticle(articleData);

        setValue("title", articleData.title);
        setValue("publisher", articleData.publisher);
        setValue(
          "tags",
          articleData.tags.map((tag) => ({ value: tag, label: tag }))
        );
        setValue("description", articleData.description);
      })
      .catch((error) => console.error("Error fetching article:", error));
  }, [id, axiosPublic, setValue]);

  const onSubmit = async (data) => {
    let imageUrl = article.image;
    if (data.image && data.image.length > 0) {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      try {
        const imageResponse = await axiosPublic.post(
          image_hosting_api,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (imageResponse.data.success) {
          imageUrl = imageResponse.data.data.display_url;
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    const updatedArticleData = {
      title: data.title,
      image: imageUrl,
      publisher: data.publisher,
      tags: data.tags.map((tag) => tag.value),
      description: data.description,
      // Other fields as needed
    };

    try {
      const updateResponse = await axiosPublic.put(
        `/articles/${id}`,
        updatedArticleData
      );
      if (updateResponse.data.modifiedCount > 0) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Article updated successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  return (
    <Container>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <Grid item xs={12} md={8}>
          <Paper style={{ padding: "20px" }}>
            <h2 style={{ textAlign: "center" }}>Update Article</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth margin="normal">
                <InputLabel shrink={!!article?.title}>Title</InputLabel>
                <TextField
                  fullWidth
                  margin="normal"
                  {...register("title", { required: true })}
                  defaultValue={article?.title}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>Publisher</InputLabel>
                <Controller
                  name="publisher"
                  control={control}
                  defaultValue="" // Set a default value
                  render={({ field }) => (
                    <MuiSelect {...field}>
                      {publishers.map((publisher) => (
                        <MenuItem key={publisher._id} value={publisher.name}>
                          {publisher.name}
                        </MenuItem>
                      ))}
                    </MuiSelect>
                  )}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} options={tagsOptions} isMulti />
                  )}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel shrink={!!article?.description}>
                  Description
                </InputLabel>
                <TextField
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  {...register("description")}
                  defaultValue={article?.description}
                />
              </FormControl>

              <Typography variant="body1" gutterBottom>
                Current Image:{" "}
                <a href={article?.image} target="_blank">
                  {article?.image}
                </a>
              </Typography>
              <input
                {...register("image")}
                type="file"
                style={{ marginTop: "10px" }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
              >
                Update Article
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UpdateArticle;
