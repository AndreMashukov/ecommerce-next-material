import fetch from 'isomorphic-unfetch';
import { API_BASE } from '../constants';
import { Order } from '../models';

export const postOrder = async (_order: Order, token: string): Promise<Order> => {
  const res = await fetch(`${API_BASE}/personal/orders`, {
    method: 'POST',
    body: JSON.stringify(_order),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  const newOrder = await res.json();
  return newOrder;
};