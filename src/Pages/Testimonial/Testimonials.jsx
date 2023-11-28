import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axiosPublic.get(
          "/testimonials"
        );
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
        What Our Clients Say About US!!
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {testimonials.map((testimonial, index) => (
          <Grid item key={index} xs={12} md={6}>
            <Card
              raised
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Typography variant="body1" sx={{ fontStyle: "italic", mb: 2 }}>
                  “{testimonial.review}”
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ mt: 2, textAlign: "right" }}
                >
                  - {testimonial.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonials;
