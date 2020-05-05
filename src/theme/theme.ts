import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';
import pink from '@material-ui/core/colors/pink';

// A theme with custom primary and secondary color.
// It's optional.

const colors = {
  primaryLight: grey[50],
  primaryMain: grey[300],
  primaryDark: grey[800],
  secondaryLight: teal[200],
  secondaryMain: teal[300],
  secondaryDark: pink[600]
};

export default createMuiTheme({
  palette: {
    primary: {
      light: colors.primaryLight,
      main: colors.primaryMain,
      dark: colors.primaryDark
    },
    secondary: {
      light: colors.secondaryLight,
      main: colors.secondaryMain,
      dark: colors.secondaryDark
    }
  },
  overrides: {
    MuiButton: {
      outlined: {
        fontWeight: 'bold',
        color: colors.secondaryDark,
        borderColor: colors.secondaryDark,
        background: `linear-gradient(45deg, ${colors.primaryLight} 30%, ${colors.primaryLight} 90%)`,

        '&:hover': {
          color: colors.primaryLight,
          borderColor: colors.primaryLight,
          background: `linear-gradient(45deg, ${colors.secondaryDark} 30%, ${colors.secondaryDark} 90%)`,
        }
      },
      contained: {
        fontWeight: 'bold',
        color: colors.secondaryDark,
        background: `linear-gradient(45deg, ${colors.primaryLight} 30%, ${colors.primaryLight} 90%)`,

        '&:hover': {
          color: colors.primaryLight,
          background: `linear-gradient(45deg, ${colors.secondaryDark} 30%, ${colors.secondaryDark} 90%)`
        }
      }
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
