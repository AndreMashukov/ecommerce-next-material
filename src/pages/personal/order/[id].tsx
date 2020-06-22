import React, { useContext, useEffect, useState } from 'react';
import '../../Layout.scss';
import { NextPageContext } from 'next';
import { getOrder } from '../../../services/OrderApi';
import SessionContext from '../../../store/SessionContext/SessionContext';
import { Order } from '../../../models';
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
  const [order, setOrder] =  useState<Partial<Order & Error>>(null);
  const router = useRouter();

  useEffect(() => {
     if (!getUser()) {
      process.browser && router.push('/auth');
    } else {
      const retrieveOrder = async () => {
        let orderOrError: Partial<Order & Error>= null;
        try {
          orderOrError = await getOrder(orderId, getUser().id);
          setOrder(orderOrError);
        } catch (err) {
          setOrder(orderOrError);
          // tslint:disable-next-line: no-console
          console.log(orderOrError);
        }
        setLoading(false);
      };

      retrieveOrder();
    }
  }, [orderId]);

  return (
    <div className="page-root-layout">
      {!loading && (
        <div style={{ margin: '20px' }}>
          {order ? (<OrderDetails order={order}/>) : (
            <div>
              <Typography variant="h5" color="error">Заказ не найден</Typography>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

PersonalOrderIdPage.getInitialProps = async (ctx: NextPageContext) => {
  const orderId = parseInt(ctx.query.id[0], 0);
  return {
    orderId
  };
};

export default PersonalOrderIdPage;
