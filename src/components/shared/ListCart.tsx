import React, { useContext, useEffect } from 'react';
import CartContext from '../../store/CartContext/CartContext';
import { CartItem } from '../../models';
import { makeStyles, Grid, Typography, Button } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import SessionContext from '../../store/SessionContext/SessionContext';
import { getCartItemsNumber, getCartTotal } from '../../utils/Cart';
import { ListCartItem } from './ListCartItem';
import theme from '../../theme/theme';
import { useRouter } from 'next/router';

interface Props {
  isPopup: boolean;
  onClose?: () => void;
}

const useStyles = makeStyles({
  fontWeigthBold: {
    fontWeight: 'bold'
  },
  total: {
    height: '80px',
    borderTop: `1px solid ${theme.palette.primary.main}`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

export const ListCart = (props: Props) => {
  const { isPopup, onClose } = props;
  const { items, syncCart } = useContext(CartContext);
  const { getSessionId } = useContext(SessionContext);
  const classes = useStyles();
  const router = useRouter();

  const handleMakeOrderClick = () => {
    isPopup && onClose();
    if (process.browser) {
      router.push('/order/make');
    }
  };

  useEffect(() => {
    syncCart(getSessionId());
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
            <Typography variant="h6" className={classes.fontWeigthBold}>
              Всего товаров: {items ? getCartItemsNumber(items) : 0} /{' '}
              {items ? getCartTotal(items) : 0} ₽
            </Typography>
          </Grid>
          <Grid item>
            {isPopup && (<IconButton
              aria-label="close"
              color="inherit"
              onClick={props.onClose}
            >
              <ArrowRightAltIcon />
            </IconButton>)}
          </Grid>
        </Grid>
      </div>
      {isPopup && (<div>
        <Button
          variant="outlined"
          style={{ marginBottom: '15px' }}
          onClick={() => {
            handleMakeOrderClick();
          }}
        >
          ОФОРМИТЬ ЗАКАЗ
        </Button>
      </div>)}
      <Grid container direction="column" justify="flex-start">
        {items &&
          items.map((item: CartItem) => (
            <Grid item key={item.productId}>
              <ListCartItem item={item} sessionId={getSessionId()} />
            </Grid>
          ))}
      </Grid>
      <div className={classes.total}>
        <Typography variant="h6" className={classes.fontWeigthBold}>
          Итого : {items ? getCartTotal(items) : 0} ₽
        </Typography>
      </div>
      <Grid container justify="flex-end">
      {!isPopup && (<div>
        <Button
          variant="outlined"
          style={{ marginBottom: '15px' }}
          onClick={() => {
            handleMakeOrderClick();
          }}
        >
          ПЕРЕЙТИ К ОФОРМЛЕНИЮ
        </Button>
      </div>)}
      </Grid>
    </div>
  );
};
