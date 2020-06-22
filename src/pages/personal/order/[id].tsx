import React, { useContext, useEffect, useState } from 'react';
import '../../Layout.scss';
import { NextPageContext } from 'next';
import { getOrder } from '../../../services/OrderApi';
import SessionContext from '../../../store/SessionContext/SessionContext';
import { Order, Error } from '../../../models';
import { useRouter } from 'next/router';
import { OrderDetails } from '../../../components/shared';
import Typography from '@material-ui/core/Typography';

interface PersonalOrderIdPageProps {
  orderId: number;
}

const PersonalOrderIdPage = (props: PersonalOrderIdPageProps) => {
  const { orderId } = props;
  const { getUser } = useContext(SessionContext);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Partial<Order & Error>>(null);
  const router = useRouter();

  useEffect(() => {
    if (!getUser()) {
      process.browser && router.push('/auth');
    } else {
      const retrieveOrder = async () => {
        let orderOrError: Partial<Order & Error> = null;
        orderOrError = await getOrder(orderId, getUser().id);
        setOrder(orderOrError);
        setLoading(false);
      };

      retrieveOrder();
    }
  }, [orderId]);

  return (
    <div className="page-root-layout">
      {!loading && (
        <div style={{ margin: '20px' }}>
          {!order.status ? (
            <OrderDetails order={order} />
          ) : (
            <div>
              <Typography variant="h5" color="error">
                Заказ не найден
              </Typography>
            </div>
          )}
        </div>
      )}
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
