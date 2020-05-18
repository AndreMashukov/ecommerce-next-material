export const API_BASE = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:3000/api'
  : 'http://localhost:3000/api';

export const PRODUCT_CATALOG_ID = 4;
export const CATALOG_NAME = 'catalog';
export const PRODUCT_PROPERTIES = {
  SPECIAL_OFFER: 13,
  NEW: 14,
  TOP_SELL: 15,
  RECOMMENDED: 19,
  PRICE: 22
};
