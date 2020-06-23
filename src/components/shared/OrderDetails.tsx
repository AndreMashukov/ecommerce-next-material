import React from 'react';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import theme from '../../theme/theme';
import { Order } from '../../models';
import { REGIONS } from '../../constants';

interface Props {
  order: Order;
}

interface OrderDetailsTableProps {
  title: string;
  columnOne: string[];
  columnTwo: string[];
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
            <OrderDetailsTable
              title={'Персональные данные'}
              columnOne={['Имя', 'E-Mail', 'Телефон']}
              columnTwo={[
                `${order.user.firstName} ${order.user.lastName}`,
                order.user.email,
                order.props.phone
              ]}
            />
            <OrderDetailsTable
              title={'Данные для доставки'}
              columnOne={['Город', 'Адрес доставки']}
              columnTwo={[
                order.props.region === REGIONS.MOSCOW.id
                  ? REGIONS.MOSCOW.name
                  : order.props.city,
                order.props.address
              ]}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const OrderDetailsTable = (_props: OrderDetailsTableProps) => {
  const { title, columnOne, columnTwo } = _props;
  const classes = useStyles();
  const gridItemJustify = 'center';
  return (
    <div style={{ marginBottom: '10px' }}>
      <Grid container justify="center">
        <Typography variant="body1" className={classes.fontWeigthBold}>
          {title}
        </Typography>
      </Grid>
      <Grid
        container
        justify="center"
        direction="row"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={6}>
          <Grid
            container
            justify={gridItemJustify}
            direction="column"
            alignItems="flex-end"
          >
            {columnOne.map((item) => (
              <Grid item>{item}:</Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid
            container
            justify={gridItemJustify}
            direction="column"
            alignItems="flex-start"
          >
            {columnTwo.map((item) => (
              <Grid item>{item}</Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
