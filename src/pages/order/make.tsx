import React, { useContext } from 'react';
import { NextPageContext } from 'next';
import { handleSession } from '../../utils/handleSession';
import CartContext from '../../store/CartContext/CartContext';

interface Props {
  _sessionId: string;
}

const OrderMakePage = (props: Props) => {
  const { _sessionId } = props;
  const { getItems } = useContext(CartContext);


  // tslint:disable-next-line: no-console
  console.log(getItems(_sessionId));

  return <></>;
};

OrderMakePage.getInitialProps = async (ctx: NextPageContext) => {
  const session = await handleSession(ctx);

  return {
    _sessionId: session._sessionId
  };
};

export default OrderMakePage;
