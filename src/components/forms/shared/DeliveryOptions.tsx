import React, { useContext, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import { getDeliveryOptions } from '../../../services/DeliveryApi';
import { getCartTotal } from '../../../utils/Cart';
import { Delivery } from '../../../models';
import CartContext from '../../../store/CartContext/CartContext';
import { ChangeEventType } from '../models';

interface DeliveryOptionsProps {
  region: number;
  deliveryId: number;
  setDeliveryId: (_deliveryId: number) => number;
  setDeliveryPrice: (_deliveryPrice: number) => number;
  onDeliveryChange: (event: ChangeEventType) => number;
}

export const DeliveryOptions = (props: DeliveryOptionsProps) => {
  const {
    region,
    deliveryId,
    setDeliveryId,
    setDeliveryPrice,
    onDeliveryChange
  } = props;
  const { getItems } = useContext(CartContext);
  const [deliveryOptions, setDeliveryOptions] = useState([]);

  useEffect(() => {
    const getDelivery = async (): Promise<void> => {
      const deliveries: Delivery[] = await getDeliveryOptions(
        region,
        getCartTotal(getItems())
      );
      setDeliveryOptions(deliveries);
      // TODO: Should choose delivertId from selected option
      setDeliveryId(deliveries[0].delivery_id);
      setDeliveryPrice(deliveries[0].delivery_price);
    };

    getDelivery();
  }, [region, getItems()]);

  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      spacing={1}
      style={{ marginBottom: '10px' }}
    >
      {deliveryOptions.map((delivery) => (
        <Grid item key={`DeliveryOptions_${delivery.delivery_id}`}>
          <Paper style={{ padding: '20px' }}>
            <Grid
              container
              justify="space-between"
              alignItems="flex-start"
              spacing={4}
              id={`delivery_${delivery.delivery_id}`}
            >
              <Grid item xs={1}>
                <div style={{ position: 'relative' }}>
                  <Radio
                    style={{
                      position: 'absolute',
                      bottom: '30px',
                      top: '25px'
                    }}
                    checked={deliveryId === delivery.delivery_id}
                    onChange={onDeliveryChange}
                    value={delivery.delivery_id}
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <Typography style={{ fontWeight: 'bold' }}>
                  {delivery.delivery_name}
                </Typography>
                <Typography>{delivery.delivery_description}</Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-end"
                >
                  <Typography>Срок доставки</Typography>
                  <Typography>
                    {delivery.delivery_period_from} -{' '}
                    {delivery.delivery_period_to}{' '}
                    {delivery.delivery_period_to > 5 ? 'дней' : 'дня'}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-end"
                >
                  <Typography>Стоимость доставки</Typography>
                  <Typography>
                    {parseInt(delivery.delivery_price.toString(), 0)} ₽
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
