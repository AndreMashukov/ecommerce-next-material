import { Product, CartItem } from '../../models';

export default interface CartContextManager {
  syncCart: () => void;
  removeItem: (id?: string) => void;
  addItem: (item: CartItem) => void;
  products: Product[];
  items: CartItem[];
}
