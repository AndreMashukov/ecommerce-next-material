import axios, { AxiosResponse } from 'axios';
import { getAdminOrderListDto, getOrderListDto } from './dto/OrderApiDto';
import { API_BASE } from '../constants';
import { Order, OrderView, OrderViewList, Error } from '../models';
import { pickPropsFromDto } from '../utils/shared';

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
  userId: string
): Promise<OrderView[] | []> => {
  const res: Partial<OrderViewList & Error> = await getOrderListDto(userId);
  if (!res.status) {
    return pickPropsFromDto<OrderViewList>(res, 'orders').orders;
  } else {
    return [];
  }
};

export const getAdminOrderList = async (): Promise<OrderView[] | []> => {
  const res: Partial<OrderViewList & Error> = await getAdminOrderListDto();
  if (!res.status) {
    return pickPropsFromDto<OrderViewList>(res, 'orders').orders;
  } else {
    return [];
  }
};
