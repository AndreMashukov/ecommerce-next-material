import { CartItem } from '../../models';

export default interface CartContextManager {
  syncCart: (sessionId: string) => void;
  removeItem: (sessionId: string, id: number) => void;
  addItem: (sessionId: string, item: CartItem, callback: () => void) => void;
  items: CartItem[];
}
