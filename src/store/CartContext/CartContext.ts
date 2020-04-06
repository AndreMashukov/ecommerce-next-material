import React from 'react';
import { CartItem } from '../../models';
import CartContextManager from './CartContextManager';

const CartContext = React.createContext<CartContextManager>({
  // tslint:disable-next-line: no-console
  removeItem: (id: number) => console.log(id),
  // tslint:disable-next-line: no-console
  addItem: (item: CartItem) => console.log(item),
  syncCart: () => null,
  products: [],
  items: []
});

export default CartContext;
