import React from 'react';
import { CartItem } from '../../models';
import CartContextManager from './CartContextManager';

const CartContext = React.createContext<CartContextManager>({
  // tslint:disable-next-line: no-console
  removeItem: (sessionId: string, id: number) => console.log(`${sessionId}${id}`),
    // tslint:disable-next-line: no-console
  addItem: (sessionId: string, item: CartItem, callback: () => void) => console.log
    (`${sessionId}${item}${callback}`),
  // tslint:disable-next-line: no-console
  syncCart: (sessionId: string) => console.log(`${sessionId}`),
  items: []
});

export default CartContext;
