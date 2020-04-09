import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import ListProductsCart from '../ListProductsCart/ListProductsCart';
import { makeStyles } from '@material-ui/styles';
import theme from '../../theme/theme';
import CartContextManager from '../../store/CartContext/CartContextManager';
import CartContext from '../../store/CartContext/CartContext';

const cartIsEmpty = 'корзина пуста';
const cartIsNotEmpty = 'всего товаров';

const useStyles = makeStyles({
  cartInfo: {
    cursor: 'pointer',
    color: theme.palette.primary.dark
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
  const { items, syncCart } = useContext<CartContextManager>(CartContext);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handlePopoverOpen = () => {
    setAnchorEl(divRef.current);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    syncCart();
  }, []);

  return (
    <div ref={divRef}>
      <Grid container 
        onClick={handlePopoverOpen} className={classes.cartInfo}
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={2}>
        <Grid item>
          {items.length === 0 ? cartIsEmpty : `${cartIsNotEmpty}: ${items.length}`}
        </Grid>
        <Grid item>
          <img src="/img/bag_full.png" />
        </Grid>
      </Grid>
      <div>
        <Popover
          id={id}
          open={open}
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
