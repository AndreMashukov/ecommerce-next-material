import React from 'react';
import CartContextManager from './CartContextManager';

const CartContext = React.createContext<CartContextManager>({
  getItems: null,
  removeItem: null,
  addItem: null,
  syncCart: null,
  decrementQty: null,
  items: []
});

export default CartContext;
