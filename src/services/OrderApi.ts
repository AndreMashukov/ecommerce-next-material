import axios, { AxiosResponse } from 'axios';
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
): Promise<Partial<Order & Error>> => {
  // tslint:disable-next-line: no-any
  let res: AxiosResponse<Partial<Order & Error>>;
  try {
    res = await axios.get(
      `${API_BASE}/personal/orders?id=${_id}&userId=${_userId}`
    );
  } catch (err) {
    return {status: res.status};
  }

  const order = await res.data;
  return order;
};
