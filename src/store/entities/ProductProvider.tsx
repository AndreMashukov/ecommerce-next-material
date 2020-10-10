import React, { useState } from 'react';
import { Subscription, from } from 'rxjs';

import { getProductsShallow } from '../../services';
import { Product } from '../../models';
import { PRODUCT_CATALOG_ID } from '../../constants';

interface ProductContext {
  products: Product[];
  loading: boolean;
  fetchProducts: (section: number) => void;
}

export const ProductContext = React.createContext<ProductContext>({
  products: [],
  loading: false,
  fetchProducts: null
});

interface ProductProviderProps {
  children?: React.ReactNode;
}

export const ProductProvider: React.FunctionComponent<{}> = (
  props: ProductProviderProps
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const subscriptions = new Subscription();

  const apiFetchProducts = async (sId: number) => {
    if (sId) {
      const p = await getProductsShallow({blockId: PRODUCT_CATALOG_ID, sectionId: sId});
      setProducts(p);
    } else {
      setProducts([]);
    }
  };

  const fetchProducts = (sId: number) => {
    setProducts([]);
    subscriptions.add(
      from(
        apiFetchProducts(sId)
      )
      .subscribe(() => {
        setLoading(false);
      })
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        fetchProducts
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
