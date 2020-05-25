import { CartItem } from '../../models';
import { CartState } from './reducers/models';

export default interface CartContextManager {
  getItems: () => CartItem[];
  syncCart: (sessionId: string) => void;
  removeItem: (sessionId: string, id: number) => void;
  addItem: (
    sessionId: string,
    item: CartItem,
    callback: (state: CartState) => void
  ) => void;
  decrementQty: (
    sessionId: string,
    item: CartItem,
    callback: (state: CartState) => void
  ) => void;
  items: CartItem[];
}
