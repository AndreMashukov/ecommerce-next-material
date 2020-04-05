import React from 'react';
import CartProvider from './CartContext/CartProvider';

// tslint:disable-next-line: no-any
const Store: React.FunctionComponent<{}> = (props: any) => {
  return (
    <CartProvider>
       {props.children}
    </CartProvider>
  );
};

export default Store;
