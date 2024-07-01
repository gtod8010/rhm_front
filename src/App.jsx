import React from 'react';
import { ThemeProvider, StyledEngineProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRoute from './route';
import { LicenseInfo } from '@mui/x-license-pro';
import { UserProvider } from './login/UserContext'; // 컨텍스트 임포트

LicenseInfo.setLicenseKey('4e8f344fbadab826b281e59d0d1945aaTz05MjMwNSxFPTE3NDk3ODA2NTAwMDAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=');

const theme = createTheme({
  palette: {
    primary: {
      main: '#c62828', // 색상 맞추기
    },
  },
});

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <Router>
            <MainRoute />
          </Router>
        </UserProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
