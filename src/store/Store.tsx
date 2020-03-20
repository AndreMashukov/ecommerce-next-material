import React, { useReducer } from 'react';
import CartContext from './CartContext';
import { Product } from '../models';
import cartReducer from './reducers/cartReducer';
import TYPES from './reducers/types';
import CartStorage from './reducers/selectors/CardStorage';

const initialValues = {
  products: CartStorage.getProductsCart(),
};

// const MyStatelessComponent : React.StatelessComponent<{}> = props =>
//     <div>{props.children}</div>

// tslint:disable-next-line: no-any
const Store: React.StatelessComponent<{}> = (props: any) => {
  const [state, dispatch] = useReducer(cartReducer, initialValues);

  function clearCart() {
    dispatch({ type: TYPES.CART_CLEAR });
  }
  function removeItem(id: string = '0'): void {
    dispatch({ type: TYPES.CART_REMOVE, id });
  }
  function addItem(product: Product): void {
    dispatch({ type: TYPES.CART_ADD, product });
  }

  function hasInTheCart(product: Product): boolean {
    return state.products.filter(p => p.id === product.id).length > 0;
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
