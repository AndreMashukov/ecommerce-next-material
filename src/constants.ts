import { ProductProperties } from './models';

export const API_BASE =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3001/api'
    : 'http://localhost:3001/api';

export const USER_RECORD_NAME = 'userState';
export const COOKIE_EXPIRY_PERIOD =  60 * 60 * 2;

export const PRODUCT_CATALOG_ID = 4;
export const CATALOG_NAME = 'catalog';

export const PRODUCT_PROPERTIES: ProductProperties = {
  SPECIAL_OFFER: {
    id: 13,
    name: 'АКЦИЯ'
  },
  NEW: {
    id: 14,
    name: 'НОВИНКА'
  },
  TOP_SELL: {
    id: 15,
    name: 'ХИТ'
  },
  RECOMMENDED: {
    id: 19,
    name: 'RECOMMENDED'
  },
  PRICE: {
    id: 22,
    name: 'PRICE'
  }
};

export const SECTION_LEVELS = {
  TOP_LEVEL: 1,
  SUB_LEVEL: 2
};
