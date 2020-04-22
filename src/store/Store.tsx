import React from 'react';
import CartProvider from './CartContext/CartProvider';
import SessionProvider from './SessionContext/SessionProvider';

// tslint:disable-next-line: no-any
const Store: React.FunctionComponent<{}> = (props: any) => {
  return (
    <SessionProvider>
      <CartProvider>
        {props.children}
      </CartProvider>
    </SessionProvider>
  );
};

export default Store;
