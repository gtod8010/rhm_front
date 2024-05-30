import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { UserContext } from '../login/UserContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Box display="flex" flexGrow={1} alignItems="center">
          <Typography variant="h6" color="inherit" component="div">
            STUDIO VIEW
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          {user && (
            <React.Fragment>
              <AccountCircle style={{ marginRight: 8 }} />
              <Typography variant="body1" color="inherit" style={{ marginRight: 16 }}>
                계정 : {user.username}
              </Typography>
              {user.point && (
                <React.Fragment>
                  <LocalAtmIcon style={{ marginRight: 8 }} />
                  <Typography variant="body1" color="inherit" style={{ marginRight: 16 }}>
                    포인트 : {user.point}P
                  </Typography>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
          {!user && (
            <Typography variant="body1" color="inherit" style={{ marginRight: 16 }}>
              업체 계정 아이디
            </Typography>
          )}
          <Button variant="outlined" color="inherit" onClick={handleLogout}>
            Log out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
