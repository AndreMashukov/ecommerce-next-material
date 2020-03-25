import fetch from 'isomorphic-unfetch';
import { API_BASE } from '../constants';

export const getCart = async (fuserId: number) => {
  const res = await fetch(`${API_BASE}/cart?fuserId=${fuserId}`);
  const json = await res.json();
  return json;
};
