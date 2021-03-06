import { ProductProperties } from './models';
import * as globals from '../global-definitions.json';

export const AWS_S3_PREFIX =
  'https://m288-images.s3.eu-central-1.amazonaws.com/';

export const API_BASE =
  process.env.NODE_ENV !== 'production'
    ? globals.dev.baseUrl
    // ? 'http://localhost:3001/api'
    : 'http://production';

export const USER_RECORD_NAME = 'userState';
export const ADMIN_CATALOG_RECORD_NAME = 'adminCatalogState';
export const COOKIE_EXPIRY_PERIOD = 60 * 60 * 2;

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

export const REGIONS = {
  MOSCOW: {
    id: 10,
    name: 'Москва'
  },
  MOSCOW_OBLAST: {
    id: 20,
    name: 'Московская область'
  },
  RUSSIA: {
    id: 30,
    name: 'по России'
  }
};

export const CATEGORY_BEAUTY = 1;
export const ROW_ITEMS_NUM = 12;

export const DASHBOARD_ITEMS = [
  {
    id: 10,
    title: 'Заказы',
    path: 'orders'
  },
  {
    id: 20,
    title: 'Каталог',
    path: 'catalog'
  }
];
