import React, { useEffect, useState } from "react";
import { Grid, Container, Typography, Button } from "@mui/material";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ArticleCard from "./ArticleCard";
import InfiniteScroll from "react-infinite-scroll-component";

const HomepageArticles = () => {
  const [articles, setArticles] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [selectedTag, setSelectedTag] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const axiosPublic = useAxiosPublic();

  const tagsOptions = ["News", "Sports", "Politics", "Tech", "Showbiz", "Literature", "Science", "Others"];

  useEffect(() => {
    fetchArticles(selectedTag, true);
  }, [selectedTag]);

  const fetchArticles = async (tag, reset = false) => {
    try {
      const response = await axiosPublic.get("/articles", {
        params: {
          tag: tag,
          page: reset ? 0 : page,
          pageSize,
        },
      });
      if (reset) {
        setArticles(response.data);
        setPage(1);
      } else {
        setArticles(prevArticles => [...prevArticles, ...response.data]);
        setPage(prevPage => prevPage + 1);
      }
      setHasMore(response.data.length === pageSize);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setPage(0);
  };

  const loadMoreArticles = () => {
    fetchArticles(selectedTag);
  };

  return (
    <Container>
      {/* Tag buttons */}
      <Grid container spacing={1} style={{ marginBottom: 20 }}>
        {tagsOptions.map((tag) => (
          <Grid item key={tag}>
            <Button variant={selectedTag === tag ? "contained" : "outlined"} onClick={() => handleTagClick(tag)}>
              {tag}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Articles Grid */}
      <InfiniteScroll
        dataLength={articles.length}
        next={loadMoreArticles}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p style={{ textAlign: "center" }}><b>No more articles</b></p>}
      >
        <Grid container spacing={2}>
          {articles.map((article) => (
            <Grid item xs={12} md={4} key={article._id}>
              <ArticleCard article={article} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
};

export default HomepageArticles;
