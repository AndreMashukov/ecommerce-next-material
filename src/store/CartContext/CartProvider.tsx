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

  function syncCart() {
    dispatch({ type: TYPES.CART_GET });
  }

  function removeItem(id: string = '0'): void {
    dispatch({ type: TYPES.CART_REMOVE, id });
  }

  function addItem(item: CartItem): void {
    dispatch({ type: TYPES.CART_ADD, item });
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
