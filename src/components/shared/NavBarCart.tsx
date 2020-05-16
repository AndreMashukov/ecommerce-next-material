import React, { useContext, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { ListCart } from './ListCart';
import { makeStyles } from '@material-ui/styles';
import theme from '../../theme/theme';
import CartContext from '../../store/CartContext/CartContext';
import { getCart } from '../../services/CartApi';
import { CartItem } from '../../models';
import SessionContext from '../../store/SessionContext/SessionContext';
import { getCartItemsNumber } from '../../utils/Cart';
import Paper from '@material-ui/core/Paper';

const cartIsEmpty = 'корзина пуста';
const cartIsNotEmpty = 'всего товаров';

const useStyles = makeStyles({
  cartInfo: {
    cursor: 'pointer',
    color: theme.palette.primary.dark
  },
  cartInactive: {
    pointerEvents: 'none'
  },
  paper: {
    padding: theme.spacing(1),
    width: '450px',
    position: 'absolute',
    right: '0',
    top: '0',
    'z-index': '10001'
  },
  paperHidden: {
    display: 'none'
  }
});

export const NavBarCart = () => {
  const classes = useStyles();
  const divRef = React.useRef();
  const [open, setOpen] = React.useState(false);
  const { items } = useContext(CartContext);
  const { getSessionId, setSessionId } = useContext(SessionContext);

  const id = open ? 'cart-paper' : undefined;

  const handlePaperOpen = () => {
    setOpen(true);
  };

  const handlePaperClose = () => {
    setOpen(false);
  };

  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    const getCartItems = async () => {
      const cartItems: CartItem[] = await getCart(getSessionId());
      if (cartItems.length === 0) {
        handlePaperClose();
      }
      setCart({ items: cartItems });
    };

    getCartItems();
  }, [items, setSessionId]);

  return (
    <div
      ref={divRef}
      className={cart.items.length === 0 ? classes.cartInactive : ''}
    >
      <Grid
        container
        onClick={handlePaperOpen}
        className={classes.cartInfo}
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          {cart.items.length === 0
            ? cartIsEmpty
            : `${cartIsNotEmpty}: ${getCartItemsNumber(cart.items)}`}
        </Grid>
        <Grid item>
          <img src="/img/bag_full.png" />
        </Grid>
      </Grid>
      {cart.items.length > 0 && (
        <div>
          <Paper
            id={id}
            elevation={3}
            className={open ? classes.paper : classes.paperHidden}
          >
            <ListCart onClose={handlePaperClose} />
          </Paper>
        </div>
      )}
    </div>
  );
};
