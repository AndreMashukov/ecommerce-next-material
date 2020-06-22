import axios from 'axios';
import { API_BASE } from '../constants';
import { Order, Error } from '../models';

export const postOrder = async (_order: Order): Promise<Order> => {
  const res = await axios.post(`${API_BASE}/personal/orders`, _order, {});
  const newOrder = await res.data;
  return newOrder;
};

export const getOrder = async (
  _id: number,
  _userId: string
): Promise<Order & Error> => {
  const res = await axios.get(
    `${API_BASE}/personal/orders?id=${_id}&userId=${_userId}`
  );
  const order = await res.data;
  return order;
};
