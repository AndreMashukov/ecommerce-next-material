import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Popover from '@material-ui/core/Popover';
import './NavBar.scss';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import theme from '../../theme/theme';
import ListProductsCart from '../ListProductsCart/ListProductsCart';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

const useStyles = makeStyles({
  upperSection: {
    padding: '5px 0 5px 0',
    'background-color': theme.palette.primary.main,
  },
  bottomSection: {
    padding: '15px 0 15px 0',
    'border-bottom': `1px solid ${theme.palette.secondary.main}`,
  },
  popover: {
    // pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
    'max-width': '400px',
    'overflow-y': 'scroll'
  },
});

export const NavBar = () => {
  const classes = useStyles();
  const divRef = React.useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);

  // tslint:disable-next-line: no-any
  const handlePopoverOpen = () => {
    setAnchorEl(divRef.current);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  let open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
        <div className={classes.bottomSection}>
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
                    <img src="/img/logo.svg" alt="Logo" />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <IconButton onClick={handlePopoverOpen} aria-label="home" color="inherit" ref={divRef}>
                <ShoppingCartIcon
                  aria-haspopup="true"
                />
              </IconButton>
              <div>
                <Popover
                  id={id}
                  open={open}
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <IconButton aria-label="remove" color="inherit"
                    onClick={handlePopoverClose}>
                    <ArrowRightAltIcon/>
                  </IconButton>
                  <ListProductsCart />
                </Popover>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};
