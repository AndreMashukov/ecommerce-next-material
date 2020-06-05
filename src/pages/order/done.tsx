import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { NextPageContext } from 'next';
import { handleSession } from '../../utils/handleSession';
import useSession from '../../hooks/useSession';

interface Props {
  session: {
    _sessionId: string;
  };
}

const OrderMakePage = (props: Props) => {
  const { _sessionId } = props.session;
  useSession(_sessionId);

  return (
    <>
      <div style={{ margin: '20px' }}>
        <Grid container direction="column" justify="center" spacing={2}>
          <Grid item>
            <Typography>Ваш заказ успешно принят!</Typography>
          </Grid>
        </Grid>
      </div>
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
