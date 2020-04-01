import { Product, CartItem } from '../models';

export default interface CartContextManager {
  // clearCart: Function;
  clearCart: () => void;
  removeItem: (id?: string) => void;
  addItem: (item: CartItem) => void;
  hasInTheCart: (product: Product) => boolean;
  products: Product[];
}
