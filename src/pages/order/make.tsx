import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { NextPageContext } from 'next';
import { handleSession } from '../../utils/handleSession';
import { OrderMakeListComposed } from '../../components';
import SessionContext from '../../store/SessionContext/SessionContext';

interface Props {
  session: {
    _sessionId: string;
  };
}

const OrderMakePage = (props: Props) => {
  const { _sessionId } = props.session;
  const navColor = 'textSecondary';
  const { setSessionId } = useContext(SessionContext);

  useEffect(() => {
    setSessionId(_sessionId);
  },[_sessionId]);

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
      <OrderMakeListComposed />
    </>
  );
};

OrderMakePage.getInitialProps = async (ctx: NextPageContext) => {
  const session = await handleSession(ctx);
  return {
    session
  };
};

export default OrderMakePage;
