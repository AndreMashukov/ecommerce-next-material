import React from 'react';
import { IconButton, Popover } from '@material-ui/core';
import ListProductsCart from '../ListProductsCart/ListProductsCart';
import { makeStyles } from '@material-ui/styles';
import theme from '../../theme/theme';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles({
  popover: {
    // pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
    'min-width': '400px',
    'max-width': '500px',
    'overflow-y': 'scroll'
  },
});

export const NavBarCart = () => {
  const classes = useStyles();
  const divRef = React.useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handlePopoverOpen = () => {
    setAnchorEl(divRef.current);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <div ref={divRef}>
      <IconButton onClick={handlePopoverOpen} aria-label="cart" color="inherit">
        <ShoppingCartIcon aria-haspopup="true" />
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
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <ListProductsCart onClose={handlePopoverClose} />
        </Popover>
      </div>
    </div>
  );
};
