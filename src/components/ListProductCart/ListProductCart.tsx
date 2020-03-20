import React, { useContext } from 'react';
import CartContext from '../../store/CartContext';
import { Product } from '../../models';

const ListProductsCart: React.FC = () => {
  const { products } = useContext(CartContext);
  return (
    <div>
      {products.map((product: Product, index: number) => (
        <div key={`${index}-ListProductsCart-${product.id}`}>
          {product.name}
        </div>
      ))}
    </div>
  );
};

export default ListProductsCart;