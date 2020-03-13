import fetch from 'isomorphic-unfetch';
import { API_BASE } from '../constants';

const SectionApi = () => {
  const getSections = async (blockId: number) => {
    const res = await fetch(`${API_BASE}/sections/block?blockId=${blockId}`);
    const json = await res.json();
    return json;
  };

  return getSections;
}

export default SectionApi;
