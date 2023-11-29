import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { FaUsers, FaNewspaper, FaPlusCircle, FaHome } from "react-icons/fa";
import AdminHome from '../Dashboard/AdminHome';

const DashboardLayout = () => {
  const routes = [
    { name: 'All Users', path: '/dashboard/allusers', icon: <FaUsers /> },
    { name: 'All Articles', path: '/dashboard/allarticles', icon: <FaNewspaper /> },
    { name: 'Add Publisher', path: '/dashboard/addpublisher', icon: <FaPlusCircle /> },
    { name: 'Back To Home', path: '/', icon: <FaHome /> },
  ];

  const drawerWidth = 240; 

  return (
    <div style={{ display: 'flex' }}>
    {/* Dashboard sidebar */}
    <Drawer
      variant="permanent"
      anchor="left"
      style={{ width: drawerWidth, backgroundColor: '#FFCC80' }} 
      sx={{ 
        '& .MuiDrawer-paper': { 
          width: drawerWidth, 
          boxSizing: 'border-box', 
          backgroundColor: '#FFCC80' 
        } 
      }}
    >
      <List>
        {routes.map(({ name, path, icon }) => (
        <ListItem button key={name} component={NavLink} to={path}>
        <ListItemText primary={icon} secondary={name} />
      </ListItem>
    ))}
      </List>
    </Drawer>

    {/* Dashboard content */}
    <div style={{ flexGrow: 1, paddingLeft: drawerWidth, padding: '20px' }}>
      <AdminHome></AdminHome>
      <Outlet /> 
    </div>
  </div>
  );
};

export default DashboardLayout;
