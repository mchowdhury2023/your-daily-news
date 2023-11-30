import React from 'react';

import Slider from 'react-slick';
import { Card, CardMedia, CardContent, Typography, Container } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const TrendingArticles = () => {
    const axiosPublic = useAxiosPublic();
    const { data: articles, error, isLoading } = useQuery({
        queryKey: ['trendingArticles'], 
        queryFn: () => axiosPublic.get('/trending-articles').then(res => res.data),
    });

    if (isLoading) {
        return <div>Loading articles...</div>;
    }

    if (error) {
        console.error('Error fetching articles:', error);
        return <div>Error loading articles.</div>;
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        rtl: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    // Inline styles
    const styles = {
        card: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        },
        cardImageContainer: {
            height: '50%', // Image container takes up 50% of the card's height
            overflow: 'hidden', // Hides the overflowed part of the image
        },
        cardImage: {
            width: '100%', // Image takes full width of the container
            height: 'auto',
            objectFit: 'cover', // Covers the height of the container
        },
        cardContent: {
            height: '50%', // Description takes up the remaining 50%
        },
        description: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            webkitLineClamp: 3,
            webkitBoxOrient: 'vertical',
        },
    };

    return (
        <Container>
            <Slider {...settings}>
                {articles.map(article => (
                    <div key={article._id}>
                        <Card style={styles.card}>
                            <div style={styles.cardImageContainer}>
                                <img 
                                    src={article.image}
                                    alt={article.title}
                                    style={styles.cardImage}
                                />
                            </div>
                            <CardContent style={styles.cardContent}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {article.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" style={styles.description}>
                                    {article.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </Slider>
        </Container>
    );
};

export default TrendingArticles;
