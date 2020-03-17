import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import HomeIcon from '@material-ui/icons/Home';
import './NavBar.scss';
// import Link from 'next/link';
import { Typography } from '@material-ui/core';

export const NavBar = class extends React.Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Grid container direction="column" alignItems="center" spacing={1}>
            <Grid item>
              <div className="navbar-layout">
                <Grid container direction="row" justify="flex-start" spacing={2}>
                  <Grid item>
                    <Typography>Доставка</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>Оплата</Typography>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item>
              <div className="bottom-section">
                <div className="navbar-layout">
                  <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={2}>
                    <Grid item>
                      <Grid container direction="row" justify="flex-start" alignItems="center" spacing={5}>
                        <Grid item>
                          <div className="img-molecule">
                            <img src="/img/molecule.svg" />
                          </div>
                        </Grid>
                        <Grid>
                          <div className="img-logo">
                            <img src="/img/logo.svg" />
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <IconButton aria-label="home" color="inherit">
                        <ShoppingCartIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
};
