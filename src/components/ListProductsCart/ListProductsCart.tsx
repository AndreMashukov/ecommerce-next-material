import React, { useContext, useEffect } from 'react';
import CartContext from '../../store/CartContext/CartContext';
import CartContextManager from '../../store/CartContext/CartContextManager';
import { CartItem } from '../../models';
import './ListProductsCart';
import { makeStyles, Grid, Typography, Button } from '@material-ui/core';
import theme from '../../theme/theme';
import { IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import SessionContext from '../../store/SessionContext/SessionContext';
import { getCartItemsNumber, getCartTotal } from '../../utils/Cart';

interface Props {
  onClose: () => void;
}

const useStyles = makeStyles({
  box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100px',
    padding: '15px 0 15px 0',
    borderTop: `1px solid ${theme.palette.primary.main}`
  },
  fontWeigthBold: {
    fontWeight: 'bold'
  }
});

const ListProductsCart = (props: Props) => {
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
              <div className={classes.box}>
                <div>
                  <Typography>{item.name}</Typography>
                </div>
                <div>
                  <IconButton
                    aria-label="remove"
                    color="inherit"
                    onClick={() => {
                      removeItem(sessionId, item.productId);
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </div>
              </div>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default ListProductsCart;
