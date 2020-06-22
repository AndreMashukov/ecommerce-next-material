import React from 'react';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import theme from '../../theme/theme';
import { Order } from '../../models';

interface Props {
  order: Order;
}

const useStyles = makeStyles({
  fontWeigthBold: {
    fontWeight: 'bold'
  }
});

export const OrderDetails = (props: Props) => {
  const { order } = props;
  const classes = useStyles();
  const primaryTextColor = 'textPrimary';

  return (
    <div style={{ margin: '20px' }}>
      <Grid container direction="column" justify="center" spacing={2}>
        <Grid item>
          <Typography
            variant="h5"
            color={primaryTextColor}
            className={classes.fontWeigthBold}
          >
            Мой заказ №{order.id}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
