import React, { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, Typography, Button, Grid, Container } from '@mui/material';
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const PremiumArticles = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: articles, error, isLoading } = useQuery({
    queryKey: ['premiumArticles'],
    queryFn: () => axiosSecure.get('/articles').then(res => 
        res.data.filter(article => article.isPremium === 'Yes')
    ),
    // You can add additional options here if needed
});

if (isLoading) {
    return <div>Loading articles...</div>;
}

if (error) {
    console.error('Error fetching articles:', error);
    return <div>Error loading articles.</div>;
}

  const handleDetails = (articleId) => {
    navigate(`/articles/${articleId}`);
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Premium Articles
      </Typography>
      <Grid container spacing={3}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article._id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={article.image}
                alt={article.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {article.description}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  Publisher: {article.publisher}
                </Typography>
                <Button size="small" color="primary" onClick={() => handleDetails(article._id)}>
                  Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PremiumArticles;
