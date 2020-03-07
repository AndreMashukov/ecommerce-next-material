import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import './NavBar.scss';

export const NavBar = class extends React.Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <div className="navbar-layout">
            <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={2}>
              <Grid item>
                <IconButton aria-label="home" color="inherit">
                  <HomeIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton aria-label="home" color="inherit">
                  <ShoppingCartIcon />
                </IconButton>
              </Grid>
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
};
