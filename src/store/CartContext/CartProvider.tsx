import React from 'react';
import CartContext from './CartContext';
import { CartItem } from '../../models';
import cartReducer from './reducers/cartReducer';
import TYPES from './reducers/types';
import useAsyncReducer from '../../hooks/useAsyncReducer';
import { CartState, CartAction } from './reducers/models';

interface Cart {
  items: CartItem[];
}

const initialValues: Cart = {
  items: []
};

interface CartProviderProps {
  children?: React.ReactNode;
}

const CartProvider: React.FunctionComponent<{}> = (
  props: CartProviderProps
) => {
  const { state, dispatch } = useAsyncReducer<CartState, CartAction>(
    cartReducer,
    initialValues
  );

  const getItems = (): CartItem[] => {
    return state.items;
  };

  const syncCart = (sessionId: string) => {
    dispatch({ type: TYPES.CART_GET, sessionId });
  };

  const removeItem = (sessionId: string, id: number = 0): void => {
    dispatch({ type: TYPES.CART_REMOVE, id, sessionId });
  };

  const addItem = (
    sessionId: string,
    item: CartItem,
    callback: (state: CartState) => void
  ): void => {
    dispatch({ type: TYPES.CART_ADD, item, sessionId }, callback);
  };

  const decrementQty = (
    sessionId: string,
    item: CartItem,
    callback: (state: CartState) => void
  ): void => {
    dispatch({ type: TYPES.CART_DECREMENT, item, sessionId }, callback);
  };

  return (
    <CartContext.Provider
      value={{
        getItems,
        items: state.items,
        syncCart,
        removeItem,
        decrementQty,
        addItem
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
