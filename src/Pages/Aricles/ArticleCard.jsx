import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

const ArticleCard = ({ article, onVisit }) => {
    const maxDescriptionLength = 100; // Maximum number of characters in the description

    const truncateDescription = (description) => {
        if (description.length > maxDescriptionLength) {
            return (
                <>
                    {description.substring(0, maxDescriptionLength)}...
                    <Button color="primary" onClick={onVisit} style={{ padding: 0, minWidth: 'auto', marginLeft: '5px' }}>
                        Read More
                    </Button>
                </>
            );
        }
        return description;
    };

    const cardStyle = {
        maxWidth: '345px',
        margin: '10px', // Added margin for gap between cards
        backgroundColor: article.isPremium === 'Yes' ? '#FFD700' : 'white'
    };

    return (
        <Card style={cardStyle}>
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
                    {truncateDescription(article.description)}
                </Typography>
                <Button size="small" onClick={onVisit} style={{ marginTop: '10px' }}>Details</Button>
            </CardContent>
        </Card>
    );
};

export default ArticleCard;
