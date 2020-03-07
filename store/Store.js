import React from 'react';

import CartProvider from './CartProvider';

const Store = class extends React.Component {
  render() {
    return (
      <CartProvider>
        {this.props.children}
      </CartProvider>
    )
  }
};

export default Store;
