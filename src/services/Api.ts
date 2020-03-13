import fetch from 'unfetch';
import { API_BASE } from '../constants';

// tslint:disable-next-line: no-any
function Api(this: any) {
  const decode = async () => {
    const res = await fetch(`${API_BASE}/sections/block?blockId=4`);
    const json = await res.json();
    return json;
  };

  return decode;
}

export default Api;
