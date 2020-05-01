import React from 'react';
import CartContextManager from './CartContextManager';

const CartContext = React.createContext<CartContextManager>({
  removeItem: null,
  addItem: null,
  syncCart: null,
  items: []
});

export default CartContext;
