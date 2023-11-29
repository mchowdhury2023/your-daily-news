import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Typography } from '@mui/material';
import img1 from '../assets/image1.png';
import img2 from '../assets/image2.png';
import img3 from '../assets/image3.png';


const BannerSlider = () => {
    const items = [
        {
          image: img1,
          text: 'Breaking News and In-depth Analysis'
        },
        {
          image: img2,
          text: 'Unbiased Reporting from Around the World'
        },
        {
          image: img3,
          text: 'Exclusive Stories You Can not Find Anywhere Else'
        }
      ];
    
      return (
        <Carousel>
          {items.map((item, i) => (
            <Paper key={i} style={{ 
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: 250,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            </Paper>
          ))}
        </Carousel>
      );
};

export default BannerSlider;
