import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { OrderMakeListComposed } from '../../components';
import CartContext from '../../store/CartContext/CartContext';
import Link from 'next/link';
import MatLink from '@material-ui/core/Link';

const OrderMakePage = () => {
  const { getItems } = React.useContext(CartContext);
  const navColor = 'textSecondary';

  return (
    <>
      <div style={{ margin: '20px' }}>
        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item>
            <Typography color={navColor}>
              <Link href="/catalog" prefetch={false}>
                <MatLink>КАТАЛОГ</MatLink>
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography color={navColor}>
              <ArrowRightAltIcon />
            </Typography>
          </Grid>
          <Grid item>
            <Typography color={navColor}>ЗАКАЗ</Typography>
          </Grid>
          <Grid item>
            <Typography color={navColor}>
              <ArrowRightAltIcon />
            </Typography>
          </Grid>
          <Grid item>
            <Typography color={navColor}>ОФОРМЛЕНИЕ</Typography>
          </Grid>
        </Grid>
      </div>
      <div style={{ margin: '40px 0 20px 0' }}>
        {getItems().length > 0 ? (
          <Grid container justify="center">
            <Typography variant="h3">Оформить заказ</Typography>
          </Grid>
        ) : (
          <Grid
            container
            justify="center"
            direction="column"
            spacing={3}
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h3">Ваша Корзина Пуста</Typography>
            </Grid>
            <Grid item>
              <Typography color={navColor} variant="body1">
                <Link href="/catalog" prefetch={false}>
                  <MatLink>Перейти в Каталог</MatLink>
                </Link>
              </Typography>
            </Grid>
          </Grid>
        )}
      </div>
      {getItems().length > 0 && <OrderMakeListComposed />}
    </>
  );
};

export default OrderMakePage;
