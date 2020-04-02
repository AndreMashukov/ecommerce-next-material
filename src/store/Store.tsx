import React from 'react';
import CartContext from './CartContext';
import { Product, CartItem } from '../models';
import cartReducer from './reducers/cartReducer';
import TYPES from './reducers/types';
// import CartStorage from './reducers/selectors/CardStorage';
import useAsyncReducer from './CounterContext/useAsyncReducer';

interface Cart {
  products: CartItem[];
}

const initialValues: Cart = {
  products: []
  //products: CartStorage.getProductsCart(),
};

// tslint:disable-next-line: no-any
const Store: React.FunctionComponent<{}> = (props: any) => {
  const [state, dispatch] = useAsyncReducer(cartReducer, initialValues);

  function clearCart() {
    dispatch({ type: TYPES.CART_CLEAR });
  }
  function removeItem(id: string = '0'): void {
    dispatch({ type: TYPES.CART_REMOVE, id });
  }
  function addItem(item: CartItem): void {
    dispatch({ type: TYPES.CART_ADD, item });
  }

  function hasInTheCart(product: Product): boolean {
    // tslint:disable-next-line: no-any
    return state.products.filter((p: any) => p.id === product.id).length > 0;
  }

  return (
    <CartContext.Provider
      value={{
        clearCart,
        products: state.products,
        removeItem,
        addItem,
        hasInTheCart,
      }}
    >
       {props.children}
    </CartContext.Provider>
  );
};

export default Store;
