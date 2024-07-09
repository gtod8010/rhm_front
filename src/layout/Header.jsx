import React, { useContext, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { UserContext } from '../login/UserContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/RHM.png';
import dayjs from 'dayjs';

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    // 페이지가 로드될 때 로컬 스토리지에서 사용자 정보 복원
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  useEffect(() => {
    const calculateRemainingTime = () => {
      const now = dayjs();
      let deadline = dayjs().hour(15).minute(30).second(0);

      if (now.isAfter(deadline)) {
        setRemainingTime('마감완료');
      } else {
        const diff = deadline.diff(now);
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setRemainingTime(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      }
    };

    calculateRemainingTime();
    const intervalId = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Box display="flex" flexGrow={1.7} alignItems="center">
        <Typography variant="h4" component="div" style={{ fontWeight: 'bold' }}>
            <span style={{ color: '#03c75a' }}>N</span>
            <span style={{ color: 'gray' }}> Place</span>
          </Typography>
        </Box>
        <Box display="flex" flexGrow={1} justifyContent="center" alignItems="center">
          <Typography variant="body1" color="red">
            마감시간(오후 3시반) : {remainingTime}
          </Typography>
        </Box>
        <Box display="flex" flexGrow={1} justifyContent="flex-end" alignItems="center">
          {user ? (
            <React.Fragment>
              <AccountCircle style={{ marginRight: 8 }} />
              <Typography variant="body1" color="inherit" style={{ marginRight: 16 }}>
                계정 : {user.username} {user.role === 'admin' && '(관리자)'}
              </Typography>
              {user.role === 'user' && user.point && (
                <React.Fragment>
                  <LocalAtmIcon style={{ marginRight: 8 }} />
                  <Typography variant="body1" color="inherit" style={{ marginRight: 16 }}>
                    포인트 : {user.point}P
                  </Typography>
                </React.Fragment>
              )}
            </React.Fragment>
          ) : (
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
