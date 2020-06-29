import React, { useContext, useEffect, useState } from 'react';
import '../Layout.scss';
import { getOrderList } from '../../services/OrderApi';
import SessionContext from '../../store/SessionContext/SessionContext';
import { OrderViewList, Error, OrderView } from '../../models';
import { useRouter } from 'next/router';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';
import theme from '../../theme/theme';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { Subscription, from } from 'rxjs';
import moment from 'moment';
import { getArrayFromObject, pickPropsFromDto } from '../../utils/shared';

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
  },
  table: {
    minWidth: 500
  }
});

const PersonalOrderListPage: React.FC<{}> = () => {
  const { getUser } = useContext(SessionContext);
  const [loading, setLoading] = useState(true);
  const [orderListOrError, setOrderListOrError] = useState<
    Partial<OrderViewList & Error>
  >(null);
  const [orderList, setOrderList] = useState<Partial<OrderViewList>>(null);
  const router = useRouter();
  const classes = useStyles();

  useEffect(() => {
    const subscriptions = new Subscription();
    if (!getUser()) {
      process.browser && router.push('/auth');
    } else {
      subscriptions.add(
        from(getOrderList(getUser().id)).subscribe((resp) => {
          setOrderListOrError(resp);
          if (!resp.status) {
            setOrderList(pickPropsFromDto<OrderViewList>(resp, 'orders'));
          }
          setLoading(false);
        })
      );
    }

    return () => {
      subscriptions.unsubscribe();
    };
  }, []);

  return (
    <div className="page-root-layout">
      <div>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            <Typography>Главная</Typography>
          </Link>
          <Typography>Заказы</Typography>
        </Breadcrumbs>
      </div>
      <div style={{ margin: '20px' }}>
        <Grid container direction="column" justify="center" spacing={1}>
          <Grid item>
            <Typography
              variant="h5"
              color="textPrimary"
              className={classes.fontWeigthBold}
            >
              Мои заказы
            </Typography>
          </Grid>
          {!loading && !orderListOrError.status ? (
            <OrderList {...orderList.orders} />
          ) : (
            <div style={{ margin: '20px' }}>
              <Typography variant="h5" color="error">
                Заказы не найден
              </Typography>
            </div>
          )}
        </Grid>
      </div>
    </div>
  );
};

const OrderList: React.FC<OrderView[]> = (orders: OrderView[]) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" justify="center" spacing={1}>
      {getArrayFromObject<OrderView>(orders).map((order: OrderView) => (
        <Grid item>
          <Paper className={classes.paper}>
            <Grid container className={classes.border}>
              <Typography variant="body1">
                Заказ №{order.id} от{' '}
                {moment(order.dateInsert).format('DD.MM.YYYY HH:MM')}
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default PersonalOrderListPage;
