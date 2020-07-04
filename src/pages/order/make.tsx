import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { OrderMakeListComposed, OrderStepNav } from '../../components';
import CartContext from '../../store/CartContext/CartContext';
import Link from 'next/link';
import MatLink from '@material-ui/core/Link';
import '../Layout.scss';
import { NextPage } from 'next';
import { CATALOG_NAME } from '../../constants';

const OrderMakePage: NextPage<{}> = () => {
  const { getItems } = React.useContext(CartContext);
  const navColor = 'textSecondary';

  return (
    <div className="page-root-layout">
      <div style={{ margin: '20px' }}>
        <OrderStepNav step={2} />
      </div>
      <div style={{ margin: '40px 0 20px 0' }}>
        {getItems().length > 0 ? (
          <Grid container justify="center">
            <Typography variant="h3">Оформить заказ</Typography>
          </Grid>
        ) : (
          <Grid
            container
            justify="center"
            direction="column"
            spacing={3}
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h3">Ваша Корзина Пуста</Typography>
            </Grid>
            <Grid item>
              <Typography color={navColor} variant="body1">
                <Link href={`\${CATALOG_NAME}`} prefetch={false}>
                  <MatLink>Перейти в Каталог</MatLink>
                </Link>
              </Typography>
            </Grid>
          </Grid>
        )}
      </div>
      {getItems().length > 0 && <OrderMakeListComposed />}
    </div>
  );
};

export default OrderMakePage;
