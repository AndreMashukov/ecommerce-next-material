import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';

// A theme with custom primary and secondary color.
// It's optional.
export default createMuiTheme({
  palette: {
    primary: {
      light: grey[50],
      main: grey[200],
      dark: grey[900]
    },
    secondary: {
      light: teal[200],
      main: teal[300],
      dark: teal[700]
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
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
