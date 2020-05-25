import React, { useContext, useCallback } from 'react';
import CartContext from '../../store/CartContext/CartContext';
import SessionContext from '../../store/SessionContext/SessionContext';

export const OrderMakeList = () => {
  const { syncCart, items } = useContext(CartContext);
  const { getSessionId } = useContext(SessionContext);

  useCallback(() => {
    syncCart(getSessionId());
  },[items]);

    // tslint:disable-next-line: no-console
    console.log(items);

  return <></>;
}