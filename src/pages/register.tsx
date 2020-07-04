import React, { useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import theme from '../theme/theme';
import { RegisterFormComposed } from '../components/forms/RegisterForm';
import SessionContext from '../store/SessionContext/SessionContext';
import { useRouter } from 'next/router';
import './Layout.scss';
import { NextPage } from 'next';

const useStyles = makeStyles({
  pageRootExtended: {
    backgroundColor: theme.palette.primary.main
  },
  root: {
    padding: '20px 70px 70px 70px'
  },
  innerBackground: {
    padding: '10px 0 20px 0'
  },
  lightBorder: {
    padding: '30px',
    backgroundColor: theme.palette.primary.light
  }
});

const RegisterPage: NextPage<{}> = () => {
  const classes = useStyles();
  const router = useRouter();
  const { getUser } = useContext(SessionContext);

  useEffect(() => {
    if (getUser()) {
      process.browser && router.push('/personal/profile');
    }
  }, [getUser()]);

  return (
    <div className={classes.pageRootExtended}>
      <div className="page-root-layout">
        <div className={classes.root}>
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.innerBackground}
          >
            <Typography variant="h3">Регистрация на сайте</Typography>
          </Grid>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid className={classes.lightBorder} item>
              <Grid
                container
                justify="center"
                alignItems="center"
                className={classes.innerBackground}
              >
                <RegisterFormComposed />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
