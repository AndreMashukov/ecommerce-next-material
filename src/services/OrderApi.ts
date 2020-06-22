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
  let res: AxiosResponse<Partial<Order & Error>>;
  try {
    res = await axios.get(
      `${API_BASE}/personal/orders?id=${_id}&userId=${_userId}`
    );
  } catch (err) {
    const { status } = err.response;
    return { status };
  }

  const order = res.data;
  return order;
};
