import React, { useContext, useEffect } from 'react';
import CartContext from '../../store/CartContext/CartContext';
import CartContextManager from '../../store/CartContext/CartContextManager';
import { CartItem } from '../../models';
import { makeStyles, Grid, Typography, Button } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import SessionContext from '../../store/SessionContext/SessionContext';
import { getCartItemsNumber, getCartTotal } from '../../utils/Cart';
import { ListProductsCartItem } from './ListProductsCartItem';

interface Props {
  onClose: () => void;
}

const useStyles = makeStyles({
  fontWeigthBold: {
    fontWeight: 'bold'
  }
});

export const ListProductsCart = (props: Props) => {
  const { items, removeItem, syncCart } = useContext<CartContextManager>(
    CartContext
  );
  const { sessionId } = useContext(SessionContext);
  const classes = useStyles();

  useEffect(() => {
    syncCart(sessionId);
  }, []);

  return (
    <div>
      <div>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="baseline"
        >
          <Grid item>
            <Typography variant="body1" className={classes.fontWeigthBold}>
              Всего товаров: {items ? getCartItemsNumber(items) : 0} /{' '}
              {items ? getCartTotal(items) : 0} ₽
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={props.onClose}
            >
              <ArrowRightAltIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
      <div>
        <Button variant="outlined" style={{ marginBottom: '15px' }}>
          ОФОРМИТЬ ЗАКАЗ
        </Button>
      </div>
      <Grid container direction="column" justify="flex-start">
        {items &&
          items.map((item: CartItem) => (
            <Grid item key={item.productId}>
              <ListProductsCartItem
                item={item}
                sessionId={sessionId}
                removeItem={removeItem}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

