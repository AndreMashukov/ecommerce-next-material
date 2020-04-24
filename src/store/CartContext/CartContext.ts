import React from 'react';
import { CartItem } from '../../models';
import CartContextManager from './CartContextManager';

const CartContext = React.createContext<CartContextManager>({
  // tslint:disable-next-line: no-console
  removeItem: (sessionId: number, id: number) => console.log(`${sessionId}${id}`),
  // tslint:disable-next-line: no-console
  addItem: (sessionId: number, item: CartItem) => console.log(`${sessionId}${item}`),
  // tslint:disable-next-line: no-console
  syncCart: (sessionId: number) => console.log(`${sessionId}`),
  items: []
});

export default CartContext;
