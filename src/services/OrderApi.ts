import axios, { AxiosResponse } from 'axios';
import { API_BASE } from '../constants';
import { Order, OrderView, OrderViewList, Error } from '../models';

export const postOrder = async (_order: Order): Promise<Order> => {
  const res = await axios.post(`${API_BASE}/personal/orders`, _order, {});
  const newOrder = await res.data;
  return newOrder;
};

export const getOrder = async (
  _id: number,
  _userId: string
): Promise<Partial<OrderView & Error>> => {
  let res: AxiosResponse<Partial<OrderView & Error>>;
  try {
    res = await axios.get(
      `${API_BASE}/personal/orders?id=${_id}&userId=${_userId}`
    );
  } catch (err) {
    const { status } = err!.response;
    return { status };
  }

  const order = res.data;
  return order;
};

export const getOrderList = async (
  _userId: string
): Promise<Partial<OrderViewList & Error>> => {
  let res: AxiosResponse<Partial<OrderViewList & Error>>;
  try {
    res = await axios.get(
      `${API_BASE}/personal/orders/list?&userId=${_userId}`
    );
  } catch (err) {
    const { status } = err.response;
    return { status };
  }

  return res.data;
};

export const getAdminOrderList = async (): Promise<
  Partial<OrderViewList & Error>
> => {
  let res: AxiosResponse<Partial<OrderViewList & Error>>;
  try {
    res = await axios.get(`${API_BASE}/admin/orders/list`);
  } catch (err) {
    const { status } = err.response;
    return { status };
  }

  return res.data;
};
