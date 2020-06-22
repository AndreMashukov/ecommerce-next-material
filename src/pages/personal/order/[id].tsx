import React, { useContext, useEffect, useState } from 'react';
import '../../Layout.scss';
import { NextPageContext } from 'next';
import { getOrder } from '../../../services/OrderApi';
import SessionContext from '../../../store/SessionContext/SessionContext';
import { Order } from '../../../models';
import { useRouter } from 'next/router';
import { OrderDetails } from '../../../components/shared';

interface PersonalOrderIdPageProps {
  orderId: number;
}

const PersonalOrderIdPage = (props: PersonalOrderIdPageProps) => {
  const { orderId } = props;
  const { getUser } = useContext(SessionContext);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] =  useState<Order & Error>(null);
  const router = useRouter();

  useEffect(() => {
    if (!orderId) {
      process.browser && router.push('/404');
    } else if (!getUser()) {
      process.browser && router.push('/auth');
    } else {
      const retrieveOrder = async () => {
        setOrder(await getOrder(orderId, getUser().id));
        setLoading(false);
      };

      retrieveOrder();
    }
  }, [orderId]);

  return (
    <div className="page-root-layout">
      {!loading && (
        <div style={{ margin: '20px' }}>
          <OrderDetails order={order}/>
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
