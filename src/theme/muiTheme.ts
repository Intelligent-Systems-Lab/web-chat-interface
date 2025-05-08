import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#242424',
    },
    background: {
      default: '#57D8F8',
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default muiTheme;