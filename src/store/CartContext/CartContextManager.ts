import { CartItem } from '../../models';

export default interface CartContextManager {
  syncCart: (sessionId: number) => void;
  removeItem: (sessionId: number, id: number) => void;
  addItem: (sessionId: number, item: CartItem) => void;
  items: CartItem[];
}
