import fetch from 'isomorphic-unfetch';
import { API_BASE } from '../constants';
import { CartItem } from '../models';

export const getCart = async (fuserId: number): Promise<CartItem[]> => {
  const res = await fetch(`${API_BASE}/cart?fuserId=${fuserId}`);
  const json = await res.json();
  return json;
};

export const addToCart = async (item: CartItem): Promise<void> => {
  fetch(`${API_BASE}/cart`, {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const removeFromCart = async (_fuserId: number, _productId: number): Promise<void> => {
  const body = {
    fuserId: _fuserId,
    productId: _productId
  };

  fetch(`${API_BASE}/cart`, {
    method: 'DELETE',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};