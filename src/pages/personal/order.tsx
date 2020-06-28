import React, { useContext, useEffect, useState } from 'react';
import '../Layout.scss';
import { getOrderList } from '../../services/OrderApi';
import SessionContext from '../../store/SessionContext/SessionContext';
import { OrderViewList, Error } from '../../models';
import { useRouter } from 'next/router';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import theme from '../../theme/theme';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { Subscription, from } from 'rxjs';

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

const PersonalOrderListPage = () => {
  const { getUser } = useContext(SessionContext);
  const [loading, setLoading] = useState(true);
  const [orderListOrError, setOrderListOrError] = useState<
    Partial<OrderViewList & Error>
  >(null);
  const [orderList, setOrderList] = useState<OrderViewList>(null);
  const router = useRouter();
  const classes = useStyles();

  const pickOrderList = ({
    orders
  }: Partial<OrderViewList & Error>): OrderViewList => ({
    orders
  });

  useEffect(() => {
    const subscriptions = new Subscription();
    if (!getUser()) {
      process.browser && router.push('/auth');
    } else {
      subscriptions.add(
        from(getOrderList(getUser().id)).subscribe((resp) => {
          setOrderListOrError(resp);
          if (!resp.status) {
            setOrderList(pickOrderList(resp));
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
            JSON.stringify(orderList)
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

export default PersonalOrderListPage;
