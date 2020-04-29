import fetch from 'isomorphic-unfetch';
import { API_BASE } from '../constants';

export const createNewSession = async () => {
  const res = await fetch(`${API_BASE}/session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const session = await res.json();
  return session;
};