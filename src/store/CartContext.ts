import React from 'react';
import { CartItem } from '../models';
import CartContextManager from './CartContextManager';

const CartContext = React.createContext<CartContextManager>({
  // tslint:disable-next-line: no-console
  removeItem: (id?: string) => console.log(id),
  // tslint:disable-next-line: no-console
  addItem: (item: CartItem) => console.log(item),
  // tslint:disable-next-line: no-console
  syncCart: () => console.log('sync cart'),
  clearCart: () => null,
  hasInTheCart: () => false,
  products: [],
  items: []
});

export default CartContext;
