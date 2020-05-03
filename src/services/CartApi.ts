import fetch from 'isomorphic-unfetch';
import { API_BASE } from '../constants';
import { CartItem } from '../models';

export const getCart = async (sessionId: string): Promise<CartItem[]> => {
  const res = await fetch(`${API_BASE}/cart?sessionId=${sessionId}`);
  const json = await res.json();
  return json;
};

export const addToCart = async (item: CartItem): Promise<void> => {
  fetch(`${API_BASE}/cart/product`, {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const removeFromCart = async (
  _sessionId: string,
  _productId: number
): Promise<void> => {
  const body = {
    sessionId: _sessionId,
    productId: _productId
  };

  fetch(`${API_BASE}/cart/product`, {
    method: 'DELETE',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
