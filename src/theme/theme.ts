import { createMuiTheme } from '@material-ui/core/styles';
import { colors } from './constants';
import grey from '@material-ui/core/colors/grey';

// A theme with custom primary and secondary color.
// It's optional.
export default createMuiTheme({
  palette: {
    primary: {
      light: colors.primary.light,
      main: colors.primary.main,
      dark: colors.primary.dark
    },
    secondary: {
      light: colors.secondary.light,
      main: colors.secondary.main,
      dark: colors.secondary.dark
    }
  },
  overrides: {
    MuiCard: {
      root: {
        backgroundColor: colors.primary.light,
        transition: 'all 0.3s linear',
        minHeight: '100px',
        maxWidth: '300px',
        margin: 'auto',
        '&:hover': {
          backgroundColor: grey[500],
          cursor: 'pointer',
          '& div': {
            color: 'white',
            fontSize: 'bolder'
          }
        }
      }
    },
    MuiCardActions: {
      root: {
      }
    },
    MuiButton: {
      outlined: {
        fontWeight: 'bold',
        color: colors.secondary.dark,
        borderRadius: '0',
        padding: '10px 15px 10px 15px',
        borderColor: colors.secondary.dark,
        background: `linear-gradient(45deg, ${colors.primary.light} 30%, ${colors.primary.light} 90%)`,

        '&:hover': {
          color: colors.primary.light,
          borderColor: colors.primary.light,
          background: `linear-gradient(45deg, ${colors.secondary.dark} 30%, ${colors.secondary.dark} 90%)`
        }
      },
      contained: {
        fontWeight: 'bold',
        color: colors.secondary.dark,
        background: `linear-gradient(45deg, ${colors.primary.light} 30%, ${colors.primary.light} 90%)`,

        '&:hover': {
          color: colors.primary.light,
          background: `linear-gradient(45deg, ${colors.secondary.dark} 30%, ${colors.secondary.dark} 90%)`
        }
      }
    }
  },
  typography: {
    h4: {
      fontFamily: 'Comfortaa, Arial, sans-serif'
    },
    h3: {
      color: colors.primary.dark
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
