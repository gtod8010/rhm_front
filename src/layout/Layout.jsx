import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Header />
      <Box display="flex" flex={1} overflow="hidden">
        <Box
          component="nav"
          sx={{
            width: { sm: 250 }, // 사이드바 너비 고정
            flexShrink: { sm: 0 },
            height: '100%', // 사이드바 높이 100%
          }}
        >
          <Sidebar />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            height: '100%', // 메인 콘텐츠 높이 100%
            overflow: 'auto', // 스크롤 가능
          }}
        >
           <Outlet />{children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
