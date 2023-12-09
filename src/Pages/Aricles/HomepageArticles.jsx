import React, { useEffect, useState } from "react";
import { Grid, Container, Button } from "@mui/material";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ArticleCard from "./ArticleCard";

const HomepageArticles = () => {
  const [articles, setArticles] = useState([]);
  const axiosPublic = useAxiosPublic();
  const tagsOptions = ["news", "sports", "politics", "Tech", "Showbiz", "Literature", "Science", "Others"];
  const [selectedTag, setSelectedTag] = useState(tagsOptions[0]); 

  useEffect(() => {
    fetchArticlesByTag(selectedTag);
  }, [selectedTag]);

  const fetchArticlesByTag = async (tag) => {
    try {
      const response = await axiosPublic.get("/articlesbytag", {
        params: { tag: tag },
      });
      console.log(response.data);
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  return (
    <Container>
      {/* Tag buttons */}
      <Grid container spacing={1} style={{ marginBottom: 20 }}>
        {tagsOptions.map((tag) => (
          <Grid item key={tag}>
            <Button 
              variant={selectedTag === tag ? "contained" : "outlined"}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Articles Grid */}
      <Grid container spacing={2}>
        {articles.map((article) => (
          <Grid item xs={12} md={4} key={article._id}>
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomepageArticles;
