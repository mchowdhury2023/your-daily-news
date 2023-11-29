import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import axios from "axios";
import { Box, Typography, Grid } from "@mui/material";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

function UserStatistic() {
  const axiosPublic = useAxiosPublic();
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => axiosPublic.get("/users").then((res) => res.data),
    // You can add additional options here if needed
  });

  const allUsers = users?.length || 0;
  const normalUsers =
    users?.filter((user) => user.membershipStatus !== "premium").length || 0;
  const premiumUsers =
    users?.filter((user) => user.membershipStatus === "premium").length || 0;

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    console.error("Error fetching users:", error);
    return <div>Error loading users.</div>;
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: "20px",
        marginLeft: "50px",
        marginRight: "50px",
        border: "2",
        borderColor: "grey.800",
        borderRadius: "2",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <StatisticCard title="All Users" count={allUsers} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatisticCard title="Normal Users" count={normalUsers} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatisticCard title="Premium Users" count={premiumUsers} />
        </Grid>
      </Grid>
    </Box>
  );
}

function StatisticCard({ title, count }) {
  return (
    <Box
      textAlign="center"
      padding={2}
      border={1}
      borderColor="grey.300"
      borderRadius={2}
    >
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4" color="primary">
        <CountUp end={count} duration={2} />
      </Typography>
    </Box>
  );
}

export default UserStatistic;
