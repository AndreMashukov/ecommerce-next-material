import React from 'react';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import theme from '../../theme/theme';
import { Order } from '../../models';

interface Props {
  order: Order;
}

const useStyles = makeStyles({
  fontWeigthBold: {
    fontWeight: 'bold'
  },
  paper: {
    padding: '20px'
  },
  border: {
    paddingLeft: '10px',
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    marginBottom: '20px'
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
        <Grid item>
          <Paper className={classes.paper}>
            <Grid container className={classes.border}>
              <Typography variant="h6">Параметры заказа</Typography>
            </Grid>
            <Grid container justify="center">
              <Typography variant="body1" className={classes.fontWeigthBold}>
                Персональные данные
              </Typography>
            </Grid>
            <Grid
              container
              justify="center"
              direction="row"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <Grid
                  container
                  justify="center"
                  direction="column"
                  alignItems="flex-end"
                >
                  <Grid item>Имя:</Grid>
                  <Grid item>E-Mail:</Grid>
                  <Grid item>Телефон:</Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Grid
                  container
                  justify="center"
                  direction="column"
                  alignItems="flex-start"
                >
                  <Grid item>
                    {' '}
                    {order.user.firstName} {order.user.lastName}
                  </Grid>
                  <Grid item>{order.user.email}</Grid>
                  <Grid item>{order.props.phone}</Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
