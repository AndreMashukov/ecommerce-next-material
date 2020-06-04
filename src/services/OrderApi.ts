import { useContext } from 'react';
import fetch from 'isomorphic-unfetch';
import { API_BASE } from '../constants';
import { Order } from '../models';
import SessionContext from '../store/SessionContext/SessionContext';

export const postOrder = async (_order: Order): Promise<Order> => {
  const { getToken } = useContext(SessionContext);
  const res = await fetch(`${API_BASE}/personal/order`, {
    method: 'POST',
    body: JSON.stringify(_order),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    }
  });

  const newOrder = await res.json();
  return newOrder;
};