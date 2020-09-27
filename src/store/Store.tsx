import React from 'react';
import CartProvider from './CartContext/CartProvider';
import SessionProvider from './SessionContext/SessionProvider';
import EntityProvider from './EntityProvider';

// tslint:disable-next-line: no-any
const Store: React.FunctionComponent<{}> = (props: any) => {
  return (
    <SessionProvider {...props}>
      <CartProvider>
        <EntityProvider>{props.children}</EntityProvider>
      </CartProvider>
    </SessionProvider>
  );
};

export default Store;
