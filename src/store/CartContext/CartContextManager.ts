import { Product, CartItem } from '../../models';

export default interface CartContextManager {
  syncCart: () => void;
  removeItem: (id: number) => void;
  addItem: (item: CartItem) => void;
  products: Product[];
  items: CartItem[];
}
