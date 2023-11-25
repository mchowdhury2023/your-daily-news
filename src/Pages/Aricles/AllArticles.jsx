import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button, Container, Paper } from '@mui/material';
import axios from 'axios';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const AllArticles = () => {
    const [articles, setArticles] = useState([]);
    const axiosPublic = useAxiosPublic();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axiosPublic.get('/articles'); 
                setArticles(response.data);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };
        fetchArticles();
    }, []);

    const today = new Date().toLocaleDateString();

    const handleArticleVisit = async (articleId) => {

      

      try {
          await axiosPublic.patch(`/article/${articleId}/visit`);
      } catch (error) {
          console.error("Error incrementing article visit:", error);
      }

      navigate(`/articles/${articleId}`)
  };

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={2}>
                    {/* Category selection options */}
                    <Paper style={{ padding: '10px' }}>
                        <Typography variant="h6">Categories</Typography>
                        {/* Categories list here */}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                        {articles.map(article => (
                            <Grid item xs={12} md={4} key={article._id}>
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
                                    </CardContent>
                                    <Button size="small" onClick={() => handleArticleVisit(article._id)}>Details</Button>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} md={2}>
                    {/* Right column for today's date and other items */}
                    <Paper style={{ padding: '10px' }}>
                        <Typography variant="h6">Today's Date</Typography>
                        <Typography>{today}</Typography>
                        {/* Additional items here */}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AllArticles;
