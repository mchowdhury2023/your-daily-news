import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import axios from 'axios';
import { Box, Typography, Grid } from '@mui/material';
import useAxiosPublic from '../../hooks/useAxiosPublic';

function UserStatistic() {
    const [allUsers, setAllUsers] = useState(0);
    const [normalUsers, setNormalUsers] = useState(0);
    const [premiumUsers, setPremiumUsers] = useState(0);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosPublic.get('/users');
                const users = response.data;
                setAllUsers(users.length);
                setNormalUsers(users.filter(user => user.membershipStatus !== 'premium').length);
                setPremiumUsers(users.filter(user => user.membershipStatus === 'premium').length);
            } catch (error) {
                console.error("Error fetching users", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <Box sx={{ flexGrow: 1, padding: '20px', marginLeft: '50px', marginRight: '50px', border:"2", borderColor:"grey.800", borderRadius:"2" }}>
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
        <Box textAlign="center" padding={2} border={1} borderColor="grey.300" borderRadius={2}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="h4" color="primary">
                <CountUp end={count} duration={2} />
            </Typography>
        </Box>
    );
}

export default UserStatistic;
