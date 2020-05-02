import fetch from 'isomorphic-unfetch';
import { API_BASE } from '../constants';
import { Section } from '../models';

export const getSections = async (blockId: number) => {
  const res = await fetch(`${API_BASE}/sections/block?blockId=${blockId}`);
  const sections: Section[] = await res.json();
  return sections.filter(section => section.active === 'Y');
};

export const getProducts = async (params: { blockId: number;
    sectionCode: string | string[] }) => {
  const res = await
    fetch(`${API_BASE}/products?blockId=${params.blockId}&sectionCode=${params.sectionCode}`);
  const json = await res.json();
  return json;
};
