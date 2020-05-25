import React, { useContext, useCallback } from 'react';
import CartContext from '../../store/CartContext/CartContext';
import SessionContext from '../../store/SessionContext/SessionContext';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import theme from '../../theme/theme';
import { CartItem } from '../../models';

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
  grid: {
    padding: '30px 70px 30px 70px',
    backgroundColor: theme.palette.primary.main
  },
  paper: {
    padding: '20px'
  },
  border: {
    borderTop: `1px solid ${theme.palette.primary.main}`
  }
});

export const OrderMakeList = () => {
  const classes = useStyles();
  const { syncCart, items, getItems } = useContext(CartContext);
  const { getSessionId } = useContext(SessionContext);

  useCallback(() => {
    syncCart(getSessionId());
  }, [items]);

  // tslint:disable-next-line: no-console
  console.log(items);

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item className={classes.grid} xs={10}>
          <Paper className={classes.paper}>
            {getItems().map((item: CartItem) => (
              <div key={`OrderMakeList_${item.productId}`}>
                <OrderMakeItem {...item} />
              </div>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const OrderMakeItem = (item: CartItem) => {
  // const classes = useStyles();

  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item xs={8}>
        <Typography>{item.name}</Typography>
        <Typography color="textSecondary">{item.skuCode}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>{item.quantity} x {parseInt(item.price.toString(), 0)} ₽</Typography>
      </Grid>
      <Grid item>
        <Typography>{item.quantity * parseInt(item.price.toString(), 0)} ₽</Typography>
      </Grid>
    </Grid>
  );
};
