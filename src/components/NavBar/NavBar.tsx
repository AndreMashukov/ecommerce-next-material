import React from 'react';
import Grid from '@material-ui/core/Grid';
import './NavBar.scss';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import theme from '../../theme/theme';
import { NavBarCart } from '../NavBarCart/NavBarCart';

const useStyles = makeStyles({
  upperSection: {
    padding: '5px 0 5px 0',
    'background-color': theme.palette.primary.main,
  },
  middleSection: {
    padding: '15px 0 15px 0',
    'border-bottom': `1px solid ${theme.palette.secondary.main}`,
  },
  bottomSection: {
    padding: '15px 0 15px 0',
  },
  paper: {
    padding: theme.spacing(1),
    'min-width': '400px',
    'max-width': '500px',
    'overflow-y': 'scroll'
  },
  topCategory: {
    color: theme.palette.primary.dark,
    cursor: 'pointer',
    'font-size': '1.05rem',
    '&:hover': {
      color: theme.palette.secondary.main,
    }
  }
});

export const NavBar = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.upperSection}>
        <div className="navbar-layout">
          <Grid container direction="row" justify="flex-start" spacing={2}>
            <Grid item>
              <Typography variant="subtitle2">Доставка</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">Оплата</Typography>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="navbar-layout">
        <div className={classes.middleSection}>
          <Grid container direction="row" justify="space-between" alignItems="center" spacing={2}>
            <Grid item>
              <a href="\">
                <Grid container direction="row" justify="flex-start" alignItems="center" spacing={5}>
                  <Grid item>
                    <div className="img-molecule">
                      <img src="/img/molecule.svg" />
                    </div>
                  </Grid>
                  <Grid>
                    <div className="img-logo">
                      <img src="/img/logo.svg" alt="Logo" />
                    </div>
                  </Grid>
                </Grid>
              </a>
            </Grid>
            <Grid item>
              <NavBarCart />
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="navbar-layout">
        <div className={classes.bottomSection}>
          <Grid container direction="row" justify="space-between" alignItems="center" spacing={2}>
            <Grid item>
              <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
                <Grid className={classes.topCategory} item>КРАСОТА</Grid>
                <Grid className={classes.topCategory} item>ЗДОРОВЬЕ</Grid>
                <Grid className={classes.topCategory} item>ДЕКОР</Grid>
                <Grid className={classes.topCategory} item>АКСЕССУАРЫ</Grid>
                <Grid className={classes.topCategory} item>PROFESSIONAL</Grid>
              </Grid>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};
