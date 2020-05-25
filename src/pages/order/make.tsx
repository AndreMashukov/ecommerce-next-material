import React, { useContext, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { NextPageContext } from 'next';
import { handleSession } from '../../utils/handleSession';
import CartContext from '../../store/CartContext/CartContext';

interface Props {
  _sessionId: string;
}

const OrderMakePage = (props: Props) => {
  const { _sessionId } = props;
  const navColor = 'textSecondary';
  const { syncCart, items, getItems } = useContext(CartContext);

  useCallback(() => {
    syncCart(_sessionId);
  },[items]);

    // tslint:disable-next-line: no-console
    console.log(getItems());

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
  return {
    _sessionId: sessionId
  };
};

export default OrderMakePage;
