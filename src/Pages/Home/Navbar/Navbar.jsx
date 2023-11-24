import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { AuthContext } from '../../../providers/AuthProvider';

const drawerWidth = 240;

function DrawerAppBar(props) {
  const { window } = props;
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  let navItems = [
    { title: 'Home', path: '/' },
    { title: 'Add Articles', path: '/add-articles' },
    { title: 'All Articles', path: '/all-articles' },
    { title: 'Subscription', path: '/subscription' },
    { title: 'Dashboard', path: '/admin-dashboard' },
    { title: 'My Articles', path: '/my-articles' },
    { title: 'Premium Articles', path: '/premium-articles' },
    
  ];

  if (user) {
    navItems.push({ title: 'Logout', path: '/logout' });
  } else {
    navItems.push({ title: 'Login/Register', path: '/login' });
  }

  const handleNavItemClick = (item) => {
    if (item.title === 'Logout') {
      handleLogout();
    } else {
      navigate(item.path);
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        DailyNews
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleNavItemClick(item)}>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            DailyNews
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
        
            {navItems.map((item) => (
              <Button key={item.title} sx={{ color: '#fff' }} onClick={() => handleNavItemClick(item)}>
                {item.title}
              </Button>
            ))}
          </Box>
          {user && (
              <>
                <Typography variant="subtitle1" sx={{ marginRight: '10px' }}>
                  {user.displayName || "User"}
                </Typography>
                <IconButton onClick={() => navigate('/profile')}>
                  <Avatar
                    src={user.photoURL || "/static/images/avatar/1.jpg"}
                    alt={user.displayName || "User"}
                    sx={{ width: 24, height: 24, marginRight: '10px' }}
                  />
                </IconButton>
              </>
            )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 0 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;
