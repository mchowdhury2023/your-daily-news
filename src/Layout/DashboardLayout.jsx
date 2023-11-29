import React, { useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { FaUsers, FaNewspaper, FaPlusCircle, FaHome } from "react-icons/fa";

const DashboardLayout = () => {
  const routes = [
    { name: 'Publisher Statistic', path: '/dashboard/publisherstat', icon: <FaNewspaper/> },
    { name: 'All Users', path: '/dashboard/allusers', icon: <FaUsers /> },
    { name: 'All Articles', path: '/dashboard/allarticles', icon: <FaNewspaper /> },
    { name: 'Add Publisher', path: '/dashboard/addpublisher', icon: <FaPlusCircle /> },
    { name: 'Back To Home', path: '/', icon: <FaHome /> },
  ];

  const location = useLocation();

  useEffect(() => {
    const siteName = 'DailyNews';
    const pageTitle = location.pathname === '|' 
                      ? siteName 
                      : `${siteName} | ${location.pathname.substring(1)}`;
    document.title = pageTitle;
}, [location]);

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
      <Outlet /> 
    </div>
  </div>
  );
};

export default DashboardLayout;
