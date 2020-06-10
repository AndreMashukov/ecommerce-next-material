import fetch from 'isomorphic-unfetch';
import { API_BASE } from '../constants';
import { User, Error } from '../models';

export const createNewUser = async (_user: User): Promise<User> => {
  const res = await fetch(`${API_BASE}/saleusers`, {
    method: 'POST',
    body: JSON.stringify(_user),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const user = await res.json();
  return user;
};

export const checkUserExists = async (_email: string): Promise<boolean> => {
  const res = await fetch(`${API_BASE}/saleusers/email?email=${_email}`);
  const json = await res.json();
  return json.email ? true : false;
};

export const loginUser = async (params: {
  email: string;
  password: string;
}): Promise<User & Error > => {
  const res = await fetch(`${API_BASE}/saleusers/auth`, {
    method: 'POST',
    body: JSON.stringify({
      email: params.email,
      password: params.password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const resp: User & Error = await res.json();

  return resp;
};
