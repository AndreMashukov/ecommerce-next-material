import fetch from 'isomorphic-unfetch';
import { API_BASE } from '../constants';
import { User } from '../models/User';

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