import React, { useContext } from 'react';
import CartContext from '../../store/CartContext/CartContext';


const OrderMakePage = () => {
  const { getItems } = useContext(CartContext);

  // tslint:disable-next-line: no-console
  console.log(getItems());

  return <></>;
};


export default OrderMakePage;
