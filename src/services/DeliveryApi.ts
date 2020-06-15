import fetch from 'isomorphic-unfetch';
import { API_BASE } from '../constants';
import { Delivery } from '../models';

export const getDeliveryOptions = async (
  regionId: number,
  orderPrice: number
) => {
  const res = await fetch(
    `${API_BASE}/delivery?regionId=${regionId}&orderPrice=${orderPrice}`
  );
  const deliveryOptions: Delivery[] = await res.json();
  return deliveryOptions;
};
