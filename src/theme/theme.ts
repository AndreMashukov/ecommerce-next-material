import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';
import pink from '@material-ui/core/colors/pink';

// A theme with custom primary and secondary color.
// It's optional.
export default createMuiTheme({
  palette: {
    primary: {
      light: grey[50],
      main: grey[300],
      dark: grey[800]
    },
    secondary: {
      light: teal[200],
      main: teal[300],
      dark: pink[600]
    }
  },
  typography: {
    h4: {
      fontFamily: 'Comfortaa, Arial, sans-serif'
    },
    fontFamily: [
      'Open Sans',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    useNextVariants: true
  // tslint:disable-next-line: no-any
  } as any
});
