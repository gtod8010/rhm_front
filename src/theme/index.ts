import { createTheme, colors } from '@mui/material';
import shadows from './shadows';
import typography from './typography';

const theme = createTheme({
  palette: {
    background: {
      default: '#f7f9fc',
      paper: '#ffffff',
    },
    primary: {
      main: '#233044',
      dark: '#233044',
      light: '#eeeeee',
      contrastText: '#eeeeeeb3',
    },
    secondary: {
      main: '#1e293a',
      dark: '#f7f9fc',
      contrastText: '#ffffff',
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
    },
  },
  shadows: shadows as any,
  typography,
});

export default theme;
