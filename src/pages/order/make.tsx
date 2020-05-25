import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { NextPageContext } from 'next';
import { handleSession } from '../../utils/handleSession';
import { getCart } from '../../services/CartApi';
import { CartItem } from '../../models';

interface Props {
  _sessionId: string;
  _cart: CartItem[];
}

const OrderMakePage = (props: Props) => {
  const { _cart } = props;
  const navColor = 'textSecondary';

  // tslint:disable-next-line: no-console
  console.log(_cart);

  return (
    <>
      <div style={{margin: '20px'}}>
        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item>
            <Typography color={navColor}>КАТАЛОГ</Typography>
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
      <div style={{margin: '40px 0 20px 0'}}>
        <Grid container justify="center">
          <Typography variant="h3">
            Оформить заказ
          </Typography>
        </Grid>
      </div>
    </>
  );
};

OrderMakePage.getInitialProps = async (ctx: NextPageContext) => {
  const sessionId = await handleSession(ctx);
  const cart = await getCart(sessionId._sessionId);
  return {
    _sessionId: sessionId,
    _cart: cart
  };
};

export default OrderMakePage;
