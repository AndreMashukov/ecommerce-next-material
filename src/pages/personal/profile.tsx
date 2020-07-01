import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import theme from '../../theme/theme';
import '../Layout.scss';
import { makeStyles } from '@material-ui/styles';
import {
  ProfileNamesFormComposed,
  ProfilePasswordFormComposed
} from '../../components';

const useStyles = makeStyles({
  pageRootExtended: {
    backgroundColor: theme.palette.primary.main,
    paddingBottom: '40px'
  },
  lightBorder: {
    padding: '30px',
    backgroundColor: theme.palette.primary.light
  }
});

const PersonalProfilePage = () => {
  const classes = useStyles();
  return (
    <div className={classes.pageRootExtended}>
      <div className="page-root-layout">
        <div>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              <Typography>Главная</Typography>
            </Link>
            <Typography>Настройки</Typography>
          </Breadcrumbs>
        </div>
        <div style={{ margin: '20px' }}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <Typography
                variant="h5"
                color="textPrimary"
                style={{ fontWeight: 'bold' }}
              >
                Мои настройки
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid className={classes.lightBorder} item>
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ padding: '10px 0 20px 0' }}
          >
            <Typography variant="h6" color="textPrimary">
              Изменить персональные данные
            </Typography>
          </Grid>
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ padding: '10px 0 20px 0' }}
          >
            <ProfileNamesFormComposed />
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid className={classes.lightBorder} item>
        <Grid
            container
            justify="center"
            alignItems="center"
            style={{ padding: '10px 0 20px 0' }}
          >
            <Typography variant="h6" color="textPrimary">
              Изменить пароль
            </Typography>
          </Grid>
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ padding: '10px 0 20px 0' }}
          >
            <ProfilePasswordFormComposed />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default PersonalProfilePage;
