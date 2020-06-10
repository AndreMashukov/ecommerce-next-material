import React, { useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import theme from '../theme/theme';
import { LoginFormComposed } from '../components/forms/LoginForm';
import SessionContext from '../store/SessionContext/SessionContext';
import { useRouter } from 'next/router';

const useStyles = makeStyles({
  root: {
    padding: '20px 70px 70px 70px',
    backgroundColor: theme.palette.primary.light
  },
  innerBackground: {
    padding: '10px 0 20px 0',
    backgroundColor: theme.palette.primary.light
  },
  darkBorder: {
    padding: '50px 70px 50px 70px',
    backgroundColor: theme.palette.primary.main
  }
});

const AuthPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const { getUser } = useContext(SessionContext);

  useEffect(() => {
    if (getUser()) {
      process.browser && router.push('/personal/profile');
    }
  }, [getUser()]);

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.innerBackground}
      >
        <Typography variant="h3">Вход</Typography>
      </Grid>
      <div className={classes.darkBorder}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.innerBackground}
        >
          <LoginFormComposed />
        </Grid>
      </div>
    </div>
  );
};

export default AuthPage;
