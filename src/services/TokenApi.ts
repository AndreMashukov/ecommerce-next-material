import fetch from 'isomorphic-unfetch';
import { API_BASE } from '../constants';
import { User, Error } from '../models';

export const refreshToken = async (params: {
  userId: string;
  refreshToken: string;
}): Promise<User & Error > => {
  const res = await fetch(`${API_BASE}/saleusers/token`, {
    method: 'POST',
    body: JSON.stringify({
      userId: params.userId,
      refreshToken: params.refreshToken
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const resp: User & Error = await res.json();

  return resp;
};
