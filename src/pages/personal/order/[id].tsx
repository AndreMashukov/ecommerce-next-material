import React, { useContext, useEffect, useState } from 'react';
import '../../Layout.scss';
import { NextPageContext } from 'next';
import { getOrder } from '../../../services/OrderApi';
import SessionContext from '../../../store/SessionContext/SessionContext';
import { OrderView, Error } from '../../../models';
import { useRouter } from 'next/router';
import { OrderDetails } from '../../../components/shared';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Link from '@material-ui/core/Link';
import { Subscription, from } from 'rxjs';

interface PersonalOrderIdPageProps {
  orderId: number;
}

const PersonalOrderIdPage = (_props: PersonalOrderIdPageProps) => {
  const { orderId } = _props;
  const { getUser } = useContext(SessionContext);
  const [loading, setLoading] = useState(true);
  const [orderOrError, setOrderOrError] = useState<Partial<OrderView & Error>>(
    null
  );
  const [order, setOrder] = useState<OrderView>(null);
  const router = useRouter();

  const pickOrderProperties = ({
    id,
    userId,
    sessionId,
    deliveryId,
    paySystemId,
    price,
    comment,
    props,
    user,
    cart,
    delivery,
    paySystem,
    payed,
    datePayed,
    dateInsert,
    orderStatus
  }: Partial<OrderView & Error>): OrderView => ({
    id,
    userId,
    sessionId,
    deliveryId,
    paySystemId,
    price,
    comment,
    props,
    user,
    cart,
    delivery,
    paySystem,
    payed,
    datePayed,
    dateInsert,
    orderStatus
  });

  useEffect(() => {
    const subscriptions = new Subscription();
    if (!getUser()) {
      process.browser && router.push('/auth');
    } else {
      subscriptions.add(
        from(getOrder(orderId, getUser().id)).subscribe((resp) => {
          setOrderOrError(resp);
          if (!resp.status) {
            setOrder(pickOrderProperties(resp));
          }
          setLoading(false);
        })
      );
    }

    return () => {
      subscriptions.unsubscribe();
    };
  }, [orderId]);

  return (
    <div className="page-root-layout">
      {!loading && (
        <div>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              <Typography>Главная</Typography>
            </Link>
            <Link color="inherit" href="/personal/order">
              <Typography>Заказы</Typography>
            </Link>
            {!orderOrError.status && (
              <Typography color="textPrimary">Мой заказ №{order.id}</Typography>
            )}
          </Breadcrumbs>
          {!orderOrError.status ? (
            <OrderDetails order={order} />
          ) : (
            <div style={{ margin: '20px' }}>
              <Typography variant="h5" color="error">
                Заказ не найден
              </Typography>
            </div>
          )}
        </div>
      )}
      <Grid container justify="center" style={{padding: '20px'}}>
        <Link color="inherit" href="/personal/order">
          <Grid container justify="space-between" alignItems="center" spacing={3}>
            <ArrowBackIcon style={{marginRight: '10px'}}/>
            <Typography>Вернуться</Typography>
          </Grid>
        </Link>
      </Grid>
    </div>
  );
};

PersonalOrderIdPage.getInitialProps = async (ctx: NextPageContext) => {
  const queryString: string | string[] = ctx.query.id;
  const orderId = parseInt(
    typeof queryString === 'string' ? queryString : queryString.join(),
    0
  );
  return {
    orderId
  };
};

export default PersonalOrderIdPage;
