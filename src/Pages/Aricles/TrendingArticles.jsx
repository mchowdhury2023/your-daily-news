import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { Card, CardMedia, CardContent, Typography, Container } from '@mui/material';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import useAxiosPublic from '../../hooks/useAxiosPublic';

const TrendingArticles = () => {
    const [articles, setArticles] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchTrendingArticles = async () => {
            try {
                const response = await axiosPublic.get('/trending-articles');
                setArticles(response.data);
            } catch (error) {
                console.error("Error fetching trending articles:", error);
            }
        };

        fetchTrendingArticles();
    }, []);

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

    return (
        <Container>
            <Slider {...settings}>
                {articles.map(article => (
                    <div key={article._id}>
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
                        </Card>
                    </div>
                ))}
            </Slider>
        </Container>
    );
};

export default TrendingArticles;
