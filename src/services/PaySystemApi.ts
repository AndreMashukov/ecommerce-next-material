import fetch from 'isomorphic-unfetch';
import { API_BASE } from '../constants';
import { PaySystem } from '../models';

export const getPaySystemOptions = async (
  regionId: number
) => {
  const res = await fetch(
    `${API_BASE}/pay_system?regionId=${regionId}`
  );
  const PaySystemOptions: PaySystem[] = await res.json();

  return PaySystemOptions;
};
