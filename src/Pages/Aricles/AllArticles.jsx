import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import ArticleCard from "./ArticleCard"; // Import ArticleCard component
import InfiniteScroll from "react-infinite-scroll-component"; // Import InfiniteScroll
import { useQuery } from "@tanstack/react-query";

const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [hasMore, setHasMore] = useState(true); // State for infinite scrolling
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const tagsOptions = [
    { value: "news", label: "News" },
    { value: "sports", label: "Sports" },
    { value: "politics", label: "Politics" },
    { value: "Tech", label: "Tech" },
  ];

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

    //fetch publishers
    const { data: publishers, error, isLoading } = useQuery({
      queryKey: ['publishers'],
      queryFn: () => axiosPublic.get('/publishers').then(res => res.data),
      // You can add additional options here if needed
  });

  useEffect(() => {
    fetchArticles();
  }, [searchTerm]); // Add searchTerm to dependency array

  const fetchArticles = async (reset = false) => {
    try {
      const response = await axiosPublic.get("/searcharticles", {
        params: {
          status: "approved",
          search: searchTerm,
          publisher: selectedPublisher,
          tags: selectedTags.join(","),
          page: reset ? 0 : page,
          pageSize,
        },
      });
      if (reset) {
        setArticles(response.data); // Reset the articles list when filters are applied
        setPage(1); // Reset to the second page (since first page data is already loaded)
      } else {
        setArticles(prevArticles => [...prevArticles, ...response.data]); // Append new articles
        setPage(prevPage => prevPage + 1); // Increment page count
      }
      setHasMore(response.data.length === pageSize);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };



  // Call fetchArticles whenever filters change
  const loadMoreArticles = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchArticles(true);
  }, [page, searchTerm, selectedPublisher, selectedTags]);

  const today = new Date().toLocaleDateString();

  const handleArticleVisit = async (articleId) => {
    try {
      await axiosPublic.patch(`/article/${articleId}/visit`);
    } catch (error) {
      console.error("Error incrementing article visit:", error);
    }

    navigate(`/articles/${articleId}`);
  };

  return (
    <Container>
      {isLoading && <div>Loading publishers...</div>}
            {error && <div>Error loading publishers.</div>}
            {!isLoading && !error && (
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
          {/* Add publisher and tag filters here */}
          <TextField
            label="Search Articles"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
  value={selectedPublisher}
  onChange={(e) => setSelectedPublisher(e.target.value)}
  fullWidth
  displayEmpty
>
  <MenuItem value="">All Publishers</MenuItem>
  {publishers.map((publisher) => (
    <MenuItem key={publisher._id} value={publisher._id}>
      {publisher.name}
    </MenuItem>
  ))}
</Select>


          <Select
            multiple
            value={selectedTags}
            onChange={(e) => setSelectedTags(e.target.value)}
            renderValue={(selected) =>
              selected
                .map(
                  (tag) =>
                    tagsOptions.find((option) => option.value === tag).label
                )
                .join(", ")
            }
            fullWidth
          >
            {tagsOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Checkbox checked={selectedTags.indexOf(option.value) > -1} />
                <ListItemText primary={option.label} />
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={8}>
          <InfiniteScroll
            dataLength={articles.length}
            next={loadMoreArticles}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>You have seen all articles</b>
              </p>
            }
          >
            <Grid container spacing={2}>
              {articles.map((article) => (
                <ArticleCard
                  key={article._id}
                  article={article}
                  onVisit={() => handleArticleVisit(article._id)}
                />
              ))}
            </Grid>
          </InfiniteScroll>
        </Grid>
        <Grid item xs={12} md={2}>
          <Paper style={{ padding: "10px" }}>
            <Typography variant="h6">Today's Date</Typography>
            <Typography>{today}</Typography>
          </Paper>
        </Grid>
      </Grid>
      )}
    </Container>
  );
};

export default AllArticles;
