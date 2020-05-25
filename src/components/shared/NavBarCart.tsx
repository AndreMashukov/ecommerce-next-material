import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { ListCart } from './ListCart';
import { makeStyles } from '@material-ui/styles';
import theme from '../../theme/theme';
import CartContext from '../../store/CartContext/CartContext';
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
  }
});

export const NavBarCart = () => {
  const classes = useStyles();
  const divRef = React.useRef();
  const [open, setOpen] = React.useState(false);
  const { items, getItems, syncCart } = useContext(CartContext);
  const { getSessionId } = useContext(SessionContext);

  const id = open ? 'cart-paper' : undefined;

  const handlePaperOpen = () => {
    setOpen(true);
  };

  const handlePaperClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    syncCart(getSessionId());
    if (getItems().length === 0) {
      handlePaperClose();
    }
  }, [items.length, getSessionId()]);

  return (
    <div
      ref={divRef}
      className={getItems().length === 0 ? classes.cartInactive : ''}
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
          {getItems().length === 0
            ? cartIsEmpty
            : `${cartIsNotEmpty}: ${getCartItemsNumber(getItems())}`}
        </Grid>
        <Grid item>
          <img src="/img/bag_full.png" />
        </Grid>
      </Grid>
      {getItems().length > 0 && (
        <div
          style={{
            display: open ? '' : 'none'
          }}
        >
          <Paper id={id} elevation={3} className={classes.paper}>
            <ListCart onClose={handlePaperClose} />
          </Paper>
        </div>
      )}
    </div>
  );
};
