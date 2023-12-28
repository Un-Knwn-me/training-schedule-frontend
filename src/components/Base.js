import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);


const { palette } = createTheme();
const { augmentColor } = palette;
  const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const defaultTheme = createTheme({
  palette: {
    tang: createColor('#000000'),
    orange: createColor('#ff9100'),
    darkblue: createColor('#282C34'),
    tertiary: createColor('#7C735F')
  }
});

export default function Base({title, description, children}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');
const [currentDateTime, setCurrentDateTime] = useState(new Date());

// Function to update the date and time
const updateDateTime = () => {
  setCurrentDateTime(new Date());
};

useEffect(() => {
  // Update the date and time every second
  const intervalId = setInterval(updateDateTime, 1000);

  // Clear the interval when the component unmounts
  return () => {
    clearInterval(intervalId);
  };
}, []);

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
const formattedDateTime = currentDateTime.toLocaleString(undefined, options);


  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = ()=>{
    sessionStorage.clear();
    navigate('/')
    // toast.done('Logged out')
  }

  const handleBackButtonClick = () => {
    navigate(-1); 
  };

    //   Fetching user name
      const getUser = async() => {
        const token = sessionStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          const { name, role } = decodedToken;
          const fullName = `${name}`;
          const roles = `${role}`;
          setUserName(fullName);
          setRole(roles);
        }
      };

      useEffect(() => {
        getUser();
      }, [])

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" style={{background:"#006158"}} open={open}>
          <Toolbar
            sx={{
              pr: '24px', 
            }}
          >
            <IconButton
              edge="start"
              color="#222222"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              QRS - {role} account
            </Typography>
            <IconButton color="#505050">
              <Badge badgeContent={0} color='orange'> 
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Box sx={{ flexGrow: 0, ml: 4 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userName} src='' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{userName}</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={()=>logout()}>Logout</Typography>
                </MenuItem>
              
            </Menu>
          </Box>

          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav" >
  
          <ListItemButton onClick={()=>navigate('/dashboard')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary= "Dashboard" />
      </ListItemButton>

            <Divider sx={{ my: 1 }} />
            
      <ListItemButton onClick={()=>navigate('/register')}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Registration" />
      </ListItemButton>
      <ListItemButton onClick={()=>navigate('/schedule')}>
        <ListItemIcon>
          <DesignServicesIcon />
        </ListItemIcon>
        <ListItemText primary="Schedule" />
      </ListItemButton>
      <ListItemButton onClick={()=>navigate('/course')}>
        <ListItemIcon>
            <AssignmentIcon/>
        </ListItemIcon>
        <ListItemText primary="Course" />
      </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
<Box
  sx={{
    m: 4,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}
>
  <Box sx={{ display: 'flex', alignItems: 'center' }} >
    <ArrowBackIcon onClick={handleBackButtonClick} sx={{ cursor: 'pointer', mr: 2 }} />
    <Box>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="caption">{description}</Typography>
    </Box>
  </Box>
  <Typography>
    {formattedDateTime}
  </Typography>
</Box>
          <Container maxWidth="lg" sx={{ my: 4 }}>
         
              <div>
        <main>
            <div>{children}</div>
        </main>
                </div>            
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}