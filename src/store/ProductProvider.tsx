import React, { useState, useEffect } from 'react';
import { useAsync } from 'react-async-hook';

import { getProductsShallow } from '../services';
import { Product, AdminCatalogRow } from '../models';
import { PRODUCT_CATALOG_ID } from '../constants';
import { getPrice } from '../utils/Product';

interface ProductContext {
  products: Product[];
  loading: boolean;
  fetchProducts: (section: number) => void;
  getProductRows: (prods: Product[]) => AdminCatalogRow[];
}

export const ProductContext = React.createContext<ProductContext>({
  products: [],
  loading: false,
  fetchProducts: null,
  getProductRows: null
});

interface ProductProviderProps {
  children?: React.ReactNode;
}

export const ProductProvider: React.FunctionComponent<{}> = (
  props: ProductProviderProps
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sectionId, setSectionId] = useState<number>(null);

  const apiFetchProducts = async (sId: number) => {
    if (sId) {
      const p = await getProductsShallow({blockId: PRODUCT_CATALOG_ID, sectionId: sId});
      return p;
    } else {
      return [];
    }
  };

  const getProductRows = (prods: Product[]): AdminCatalogRow[] => {
    return prods.map((prod) => {
      const obj = {
        id: prod.id,
        name: prod.name,
        price: `${getPrice(prod)} ₽`,
        active: prod.active === 'Y' ? 'Да' : 'Нет',
        isSection: false,
        rowItem: prod
      };
      return obj;
    });
  };

  const { result, loading } = useAsync(apiFetchProducts, [sectionId]);

  useEffect(() => {
    setProducts(result);
  }, [loading]);

  const fetchProducts = (sId: number) => {
    setSectionId(sId);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        fetchProducts,
        getProductRows
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
