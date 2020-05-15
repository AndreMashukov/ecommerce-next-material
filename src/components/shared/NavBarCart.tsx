import React, { useContext, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import { ListCart } from './ListCart';
import { makeStyles } from '@material-ui/styles';
import theme from '../../theme/theme';
import CartContext from '../../store/CartContext/CartContext';
import { getCart } from '../../services/CartApi';
import { CartItem } from '../../models';
import SessionContext from '../../store/SessionContext/SessionContext';
import { getCartItemsNumber } from '../../utils/Cart';

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
    width: '450px'
  }
});

export const NavBarCart = () => {
  const classes = useStyles();
  const divRef = React.useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { items } = useContext(CartContext);
  const { getSessionId, setSessionId } = useContext(SessionContext);

  const open = Boolean(anchorEl);
  const id = open ? 'cart-popover' : undefined;

  const handlePopoverOpen = () => {
    setAnchorEl(divRef.current);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    const getCartItems = async () => {
      const cartItems: CartItem[] = await getCart(getSessionId());
      if (cartItems.length === 0) {
        handlePopoverClose();
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
        onClick={handlePopoverOpen}
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
        <div style={{ overflowY: 'scroll' }}>
          <Popover
            id={id}
            open={open}
            classes={{
              paper: classes.paper
            }}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <ListCart onClose={handlePopoverClose} />
          </Popover>
        </div>
      )}
    </div>
  );
};
