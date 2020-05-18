import fetch from 'isomorphic-unfetch';
import { API_BASE } from '../constants';
import { Product } from '../models';

export const getProductByCode = async (params: {
  blockId: number;
  code: string | string[];
}): Promise<Product> => {
  const res = await fetch(
    `${API_BASE}/products/code?blockId=${params.blockId}&sectionCode=${params.code}`
  );
  const json = await res.json();
  return json;
};
