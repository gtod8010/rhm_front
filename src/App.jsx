import React from 'react';
import { ThemeProvider, StyledEngineProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRoute from './route';
import { LicenseInfo } from '@mui/x-license-pro';
import { UserProvider } from './login/UserContext'; // 컨텍스트 임포트

LicenseInfo.setLicenseKey(
  'e06e520e3c028e5089eb70098ac4dafcTz02ODIwOCxFPTE3MTc4MTI1MTI3NzYsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=',
);

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
