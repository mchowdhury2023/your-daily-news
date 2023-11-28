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
} from "@mui/material";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import ArticleCard from "./ArticleCard"; // Import ArticleCard component
import InfiniteScroll from "react-infinite-scroll-component"; // Import InfiniteScroll

const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [hasMore, setHasMore] = useState(true); // State for infinite scrolling
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, [searchTerm]); // Add searchTerm to dependency array

  const fetchArticles = async () => {
    try {
      const response = await axiosPublic.get("/articles", {
        params: {
          status: "approved",
          search: searchTerm,
          publisher: selectedPublisher,
          tags: selectedTags.join(","),
          page,
          pageSize
        },
      });
      setArticles(prevArticles => [...prevArticles, ...response.data]);
      setHasMore(response.data.length === pageSize);
      // setHasMore based on whether more articles are available
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  // Call fetchArticles whenever filters change
  const loadMoreArticles = () => {
    setPage(prevPage => prevPage + 1);
};

useEffect(() => {
    fetchArticles();
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
                        <MenuItem value="publisher1">Publisher 1</MenuItem>
                        <MenuItem value="publisher2">Publisher 2</MenuItem>
                       
                    </Select>
                    <TextField
                        label="Tags (comma-separated)"
                        variant="outlined"
                        fullWidth
                        value={selectedTags.join(',')}
                        onChange={(e) => setSelectedTags(e.target.value.split(','))}
                    />
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
    </Container>
  );
};

export default AllArticles;
