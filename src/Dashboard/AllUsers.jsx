import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DeleteIcon from '@mui/icons-material/Delete';
import useAxiosPublic from '../hooks/useAxiosPublic';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        // Replace with your actual API endpoint
        axiosPublic.get('/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleMakeAdmin = (user) => {
        axiosPublic.patch(`/users/admin/${user._id}`)
            .then(response => {
                if (response.data.modifiedCount > 0) {
                    setUsers(users.map(u => u._id === user._id ? { ...u, role: 'admin' } : u));
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is now an Admin!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => console.error('Error updating user:', error));
    };

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/users/${user._id}`)
                    .then(response => {
                        if (response.data.deletedCount > 0) {
                            setUsers(users.filter(u => u._id !== user._id));
                            Swal.fire('Deleted!', 'User has been deleted.', 'success');
                        }
                    })
                    .catch(error => console.error('Error deleting user:', error));
            }
        });
    };

    return (
        <Paper sx={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px' }}>
                <h2>All Users</h2>
                <h2>Total Users: {users.length}</h2>
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={user._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    {user.role === 'admin' ? 'Admin' : 
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            startIcon={<AdminPanelSettingsIcon />} 
                                            onClick={() => handleMakeAdmin(user)}>
                                            Make Admin
                                        </Button>
                                    }
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => handleDeleteUser(user)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default AllUsers;
