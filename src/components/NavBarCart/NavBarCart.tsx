import React, { useContext, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import ListProductsCart from '../ListProductsCart/ListProductsCart';
import { makeStyles } from '@material-ui/styles';
import theme from '../../theme/theme';
import CartContextManager from '../../store/CartContext/CartContextManager';
import CartContext from '../../store/CartContext/CartContext';
import { getCart } from '../../services/CartApi';
import { CartItem } from '../../models';
import SessionContext from '../../store/SessionContext/SessionContext';

const cartIsEmpty = 'корзина пуста';
const cartIsNotEmpty = 'всего товаров';

const useStyles = makeStyles({
  cartInfo: {
    cursor: 'pointer',
    color: theme.palette.primary.dark
  },
  cartInactive: {
    'pointer-events': 'none'
  },
  paper: {
    padding: theme.spacing(1),
    'min-width': '400px',
    'max-width': '500px',
    'overflow-y': 'scroll',

  },
});

export const NavBarCart = () => {
  const classes = useStyles();
  const divRef = React.useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { items } = useContext<CartContextManager>(CartContext);
  const { sessionId } = useContext(SessionContext);

  const open = Boolean(anchorEl);
  const id = open ? 'cart-popover' : undefined;

  const handlePopoverOpen = () => {
    setAnchorEl(divRef.current);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const [ cart, setCart ] = useState({ items: [] });

  useEffect(() => {
    const getCartItems = async () => {
      const cartItems: CartItem[] = await getCart(sessionId);
      if (cartItems.length === 0) {
        handlePopoverClose();
      }
      setCart({items: cartItems});
    };

    getCartItems();
  }, [items]);

  return (
    <div ref={divRef} className={cart.items.length === 0 ? classes.cartInactive: ''}>
      <Grid container
        onClick={handlePopoverOpen} className={classes.cartInfo}
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={2}>
        <Grid item>
          {cart.items.length === 0 ? cartIsEmpty : `${cartIsNotEmpty}: ${cart.items.length}`}
        </Grid>
        <Grid item>
          <img src="/img/bag_full.png" />
        </Grid>
      </Grid>
      {cart.items.length > 0 &&
        <div>
          <Popover
            id={id}
            open={open}
            classes={{
              paper: classes.paper,
            }}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
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
      }
    </div>
  );
};
