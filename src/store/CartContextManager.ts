import { Product } from '../models';

export default interface CartContextManager {
  // clearCart: Function;
  clearCart: () => {};
  removeItem: (id?: string) => void;
  addItem: (product: Product) => void;
  hasInTheCart: (product: Product) => boolean;
  products: Product[];
}
