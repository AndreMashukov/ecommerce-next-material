import React from 'react';
import CartContext from './CartContext';
import { CartItem } from '../../models';
import cartReducer from './reducers/cartReducer';
import TYPES from './reducers/types';
import useAsyncReducer from './reducers/useAsyncReducer';

interface Cart {
  items: CartItem[];
}

const initialValues: Cart = {
  items: []
};

// tslint:disable-next-line: no-any
const CartProvider: React.FunctionComponent<{}> = (props: any) => {
  const [state, dispatch] = useAsyncReducer(cartReducer, initialValues);

  function syncCart(sessionId: number) {
    dispatch({ type: TYPES.CART_GET, sessionId});
  }

  function removeItem(sessionId: number, id: number = 0): void {
    dispatch({ type: TYPES.CART_REMOVE, id, sessionId });
  }

  function addItem(sessionId: number, item: CartItem): void {
    dispatch({ type: TYPES.CART_ADD, item, sessionId});
  }

  return (
    <CartContext.Provider
      value={{
        syncCart,
        products: state.products,
        items: state.items,
        removeItem,
        addItem
      }}
    >
       {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
