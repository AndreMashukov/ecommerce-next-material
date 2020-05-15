import { CartState } from '../store/CartContext/reducers/models';

export interface CartItem {
  sessionId: string;
  blockId: number;
  productId: number;
  name?: string;
  price: number;
  quantity: number;
  currency: string;
  packageType?: string;
  skuCode?: string;
}

export type CartActionParams = (
  sId: string,
  item: CartItem,
  callback: (state: CartState) => void
);