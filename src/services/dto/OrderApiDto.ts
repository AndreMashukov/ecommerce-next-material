import axios, { AxiosResponse } from 'axios';
import { API_BASE } from '../../constants';
import { OrderViewList, Error } from '../../models';

export const getAdminOrderListDto = async (): Promise<
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

export const getOrderListDto = async (
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