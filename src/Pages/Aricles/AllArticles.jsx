import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useQuery } from "@tanstack/react-query";

const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { data: publishers, error, isLoading } = useQuery({
    queryKey: ['publishers'],
    queryFn: () => axiosPublic.get('/publishers').then(res => res.data),
  });

  useEffect(() => {
    fetchFilteredArticles();
  }, [searchTerm, selectedPublisher, page]);

  const fetchFilteredArticles = async () => {
    try {
      const response = await axiosPublic.get("/filteredarticlesbypublisher", {
        params: {
          search: searchTerm,
          publisher: selectedPublisher,
          page,
          pageSize,
        },
      });
      setArticles(response.data);
      setHasMore(response.data.length === pageSize);
    } catch (error) {
      console.error("Error fetching filtered articles:", error);
    }
  };

  const loadMoreArticles = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const today = new Date().toLocaleDateString();

  const handleArticleVisit = (articleId) => {
    navigate(`/articles/${articleId}`);
  };

  return (
    <Container>
      {isLoading && <div>Loading publishers...</div>}
      {error && <div>Error loading publishers.</div>}
      {!isLoading && !error && (
        <Grid container spacing={2}>
          {/* Search and Filters Column */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" gutterBottom>
              Search & Filters
            </Typography>
            
            {/* Publisher Filter */}
            <Select
              value={selectedPublisher}
              onChange={(e) => setSelectedPublisher(e.target.value)}
              displayEmpty
              fullWidth
              style={{ marginBottom: '10px' }}
            >
              <MenuItem value="">
                <em>All Publishers</em>
              </MenuItem>
              {publishers.map((publisher) => (
                <MenuItem key={publisher._id} value={publisher.name}>
                  {publisher.name}
                </MenuItem>
              ))}
            </Select>

            {/* Search by Title */}
            <TextField
              fullWidth
              label="Search by Title"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginBottom: '10px' }}
            />
          </Grid>

          {/* Articles Columns */}
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
                  <Grid item xs={12} md={4} key={article._id}>
                    <ArticleCard
                      article={article}
                      onVisit={() => handleArticleVisit(article._id)}
                    />
                  </Grid>
                ))}
              </Grid>
            </InfiniteScroll>
          </Grid>

          {/* Additional Info Column */}
          <Grid item xs={12} md={2}>
            <Paper style={{ padding: "10px", marginBottom: "10px" }}>
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
