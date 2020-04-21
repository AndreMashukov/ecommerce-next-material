import fetch from 'isomorphic-unfetch';
import { API_BASE } from '../constants';

export const createNewSession = async () => {
  const res = await fetch(`${API_BASE}/session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const sessionId = await res.json();
  return sessionId;
};