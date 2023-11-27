import React, { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, Typography, Button, Grid, Container } from '@mui/material';
import useAxiosPublic from "../../hooks/useAxiosPublic";

const PremiumArticles = () => {
  const [articles, setArticles] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get('/articles')
      .then(res => {
        const premiumArticles = res.data.filter(article => article.isPremium);
        setArticles(premiumArticles);
      })
      .catch(err => console.error(err));
  }, []);

  const handleDetails = (articleId) => {
    // Implement navigation or action for the Details button
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
