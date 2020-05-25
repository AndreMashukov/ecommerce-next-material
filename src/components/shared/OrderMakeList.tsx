import React, { useContext } from 'react';
import CartContext from '../../store/CartContext/CartContext';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import theme from '../../theme/theme';
import { CartItem } from '../../models';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.primary.main
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
  const { getItems } = useContext(CartContext);

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item className={classes.grid} xs={10}>
          <Paper className={classes.paper}>
            {getItems().map((item, index) => (
              <div
                key={`OrderMakeList_${item.productId}`}
                className={clsx(index !== 0 && classes.border)}
              >
                <OrderMakeItem {...item} />
              </div>
            ))}
            <div>
              <Typography variant="caption">
                Пожалуйста, внимательно проверяйте Ваши персональные данные при
                регистрации и оформлении заказа. Неправильно указанный номер
                телефона, неточный или неполный адрес могут привести к
                дополнительной задержке.
              </Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const OrderMakeItem = (item: CartItem) => {
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      style={{ padding: '20px 0 20px 0' }}
    >
      <Grid item xs={8}>
        <Typography>{item.name}</Typography>
        <Typography color="textSecondary">{item.skuCode}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>
          {item.quantity} x {parseInt(item.price.toString(), 0)} ₽
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          {item.quantity * parseInt(item.price.toString(), 0)} ₽
        </Typography>
      </Grid>
    </Grid>
  );
};
