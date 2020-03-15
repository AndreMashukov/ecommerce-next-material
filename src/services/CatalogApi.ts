import fetch from 'isomorphic-unfetch';
import { API_BASE } from '../constants';

export const getSections = async (blockId: number) => {
  const res = await fetch(`${API_BASE}/sections/block?blockId=${blockId}`);
  const json = await res.json();
  return json;
};

export const getProducts = async (params: { blockId: number; sectionCode: number }) => {
  const res = await fetch(`${API_BASE}/products?blockId=${params.blockId}&sectionCode=${params.sectionCode}`);
  const json = await res.json();
  return json;
};
