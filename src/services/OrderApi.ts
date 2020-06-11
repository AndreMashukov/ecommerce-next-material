// import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import { API_BASE } from '../constants';
import { Order } from '../models';

export const postOrder = async (_order: Order): Promise<Order> => {
  const res = await axios.post(`${API_BASE}/personal/orders`, _order, {});
  const newOrder = await res.data;
  return newOrder;
};