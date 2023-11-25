import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardMedia, CardContent, Grid } from '@mui/material';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const ArticleDetails = () => {
    const { id} = useParams();
    const [article, setArticle] = useState(null);
    const axiosPublic = useAxiosPublic();

    console.log(id)

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axiosPublic.get(`/articles/${id}`);
                console.log(response.data)
                setArticle(response.data);
            } catch (error) {
                console.error("Error fetching article details:", error);
            }
        };

        fetchArticle();
    }, [id]);

    if (!article) {
        return <Typography>Loading...</Typography>; // or any other loading state representation
    }

    return (
        <Container maxWidth="md">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="300"
                            image={article.image}
                            alt={article.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h3" component="div">
                                {article.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {article.description}
                            </Typography>
                            {/* Additional article details */}
                        </CardContent>
                    </Card>
                </Grid>
                {/* Add more grid items or components for publisher's name, image, etc. */}
            </Grid>
        </Container>
    );
};

export default ArticleDetails;
