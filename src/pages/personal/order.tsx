import React, { useContext, useEffect, useState } from 'react';
import '../Layout.scss';
import { getOrderList } from '../../services/OrderApi';
import SessionContext from '../../store/SessionContext/SessionContext';
import { OrderViewList, Error, OrderView } from '../../models';
import { useRouter } from 'next/router';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core';
import theme from '../../theme/theme';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { Subscription, from } from 'rxjs';
import moment from 'moment';
import { getArrayFromObject, pickPropsFromDto } from '../../utils/shared';
import { colors } from '../../theme/constants';

const useStyles = makeStyles({
  fontWeigthBold: {
    fontWeight: 'bold'
  },
  border: {
    padding: '10px',
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    marginBottom: '20px'
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
          {!loading && !orderListOrError.status && (
            <OrderList {...orderList.orders} />
          )}
        </Grid>
      </div>
    </div>
  );
};

const OrderList: React.FC<OrderView[]> = (orders: OrderView[]) => {
  const classes = useStyles();
  const ordersArray = getArrayFromObject<OrderView>(orders);

  return (
    <div>
      {ordersArray.length > 0 ? (
        <Grid container direction="column" justify="flex-start" spacing={1}>
          {ordersArray.map((order: OrderView) => (
            <Grid item>
              <Paper>
                <Grid container className={classes.border}>
                  <Link color="inherit" href={`/personal/order/${order.id}`}>
                    <Typography variant="body1" className={classes.fontWeigthBold}>
                      Заказ №{order.id} от{' '}
                      {moment(order.dateInsert).format('DD.MM.YYYY HH:MM')}
                    </Typography>
                  </Link>
                </Grid>
                <Grid container justify="space-around">
                  <Grid item xs={8} style={{ paddingLeft: '10px' }}>
                    <Grid container direction="column" justify="flex-start">
                      <Grid item>
                        Сумма к оплате:&nbsp;
                        {parseInt(order.price.toString(), 0) +
                          parseInt(order.delivery.price.toString(), 0)}{' '}
                        ₽
                      </Grid>
                      <Grid item>
                        Оплачен:{' '}
                        {order.payed === 'Y' ? `Да ${order.datePayed}` : 'Нет'}
                      </Grid>
                      <Grid item>
                        Способ оплаты:&nbsp;
                        {order.paySystem.name}
                      </Grid>
                      <Grid item>
                        Доставка:&nbsp;
                        {order.delivery.name}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container direction="column" justify="flex-start">
                      <Grid item>
                        {moment(order.dateInsert).format('DD.MM.YYYY HH:MM')}
                      </Grid>
                      <Grid item>
                        <Box
                          p={1}
                          style={{ backgroundColor: `${colors.badge.topSell}` }}
                        >
                          <Typography
                            variant="body2"
                            style={{ color: 'white' }}
                          >
                            {order.orderStatus.name}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container style={{ padding: '20px' }}>
                  <Grid item xs={8}>
                    <Typography variant="body2" color="textSecondary">
                      Состав заказа:
                    </Typography>
                    <Grid container direction="column" justify="flex-start">
                      {order.cart.map((item, index) => (
                        <Grid item>
                          <Grid container>
                            <Typography
                              style={{ whiteSpace: 'nowrap' }}
                              variant="body2"
                            >
                              {`${index + 1}.`}&nbsp;{item.name}
                            </Typography>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <div style={{ margin: '20px' }}>
          <Typography variant="h5" color="error">
            Заказы не найдены
          </Typography>
        </div>
      )}
    </div>
  );
};

export default PersonalOrderListPage;
