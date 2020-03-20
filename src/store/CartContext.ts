import React from 'react';
import { Product } from '../models';
import CartContextManager from './CartContextManager';

const CartContext = React.createContext<CartContextManager>({
  // tslint:disable-next-line: no-console
  removeItem: (id?: string) => console.log(id),
  // tslint:disable-next-line: no-console
  addItem: (product: Product) => console.log(product),
  clearCart: () => null,
  hasInTheCart: () => false,
  products: []
});

export default CartContext;
