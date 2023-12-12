import React, { useContext, useEffect, useState } from 'react'
import AllArticles from '../Aricles/AllArticles'
import TrendingArticles from '../Aricles/TrendingArticles'
import SubscriptionPlans from '../../Subscription/SubsciptionPlans'
import Publishers from '../Publishers/Publishers'
import UserStatistic from '../Statistics/UserStatistic'
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  Button
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Testimonials from '../Testimonial/Testimonials'
import HomepageArticles from '../Aricles/HomepageArticles'
import HomePageSubscription from '../../Subscription/HomePageSubscription'
import { AuthContext } from '../../providers/AuthProvider'
import SubscriptionModal from './SubscriptionModal'
import WeatherForm from '../Weather/WeatherForm'

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext); 

  useEffect(() => {
    let timer;
    if (user) {
      timer = setTimeout(() => {
        setShowModal(true);
      }, 10000); 
    }

    return () => clearTimeout(timer); 
  }, [user]); 

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div >
      <div style={{textAlign:'center'}}>
        <h2>Trending Articles</h2>
        <TrendingArticles></TrendingArticles>

      </div>
      <div>
      <Publishers></Publishers>
      </div>
      <div>
      <h2 style={{textAlign:'center'}}>User Statistic</h2>
      <UserStatistic></UserStatistic>

      </div>
      <div>
      <h2 style={{textAlign:'center'}}>Select Articles By Tag Name</h2>
      {/* <AllArticles></AllArticles> */}
      <HomepageArticles></HomepageArticles>

      </div>
      <div>
        {/* <SubscriptionPlans></SubscriptionPlans> */}
        <HomePageSubscription></HomePageSubscription>
      </div>
      <div>
        <WeatherForm></WeatherForm>
      </div>
      <div>
      <Box sx={{ py: 5, px: { xs: 2, sm: 3, md: 4 } }}>
        <Container>
          <Typography variant="h3" gutterBottom textAlign="center">
            About Us
          </Typography>
          <Typography variant="body1" paragraph>
            We are a team of dedicated professionals committed to providing top-notch News services. With years of experience and a passion for excellence, we ensure your get original, insight of every incident.
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={4} sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" gutterBottom>
                    Our Mission
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Our mission is to revolutionize the News industry by providing an unparalleled service experience that guarantees satisfaction and value to our customers.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={4} sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" gutterBottom>
                    Our Values
                  </Typography>
                  <List>
                    <ListItem disablePadding>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Integrity and Honesty" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Dedication to Excellence" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Commitment to Innovation" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Focus on Sustainable Practices" />
                    </ListItem>
                  </List>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ backgroundColor: '#f8f8f8', py: 5, px: { xs: 2, sm: 3, md: 4 } }}>
        <Container>
          <Typography variant="h3" gutterBottom textAlign="center">
            Contact Us
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Your Name" variant="outlined" margin="normal" />
              <TextField fullWidth label="Your Email" variant="outlined" margin="normal" />
              <TextField
                fullWidth
                label="Your Message"
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
              />
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      </div>
      <Testimonials></Testimonials>
      <SubscriptionModal open={showModal} handleClose={handleCloseModal} />
       
    </div>
  )
}

export default Home