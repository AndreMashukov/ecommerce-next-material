import React from 'react';
import { getSections, getProductByCode } from '../../../services';
import { PRODUCT_CATALOG_ID, CATALOG_NAME } from '../../../constants';
import { Section, Product } from 'models';
import {
  ProductBreadcrumbs,
  ProductNotFound,
  ProductDetail
} from '../../../components';
import Page404 from '../../404';
import { NextPage, NextPageContext } from 'next';
import '../../Layout.scss';

interface Props {
  product: Product;
  section: Section;
}

const ProductPage: NextPage<Props> = (props: Props) => {
  const { product, section } = props;

  return (
    <div className="page-root-layout">
      {product ? (
        <div>
          <div style={{ marginBottom: '30px' }}>
            <ProductBreadcrumbs product={product} section={section} />
          </div>
          <ProductDetail product={product} section={section} />
        </div>
      ) : section ? (
        <ProductNotFound url={`/${CATALOG_NAME}/${section.code}`} />
      ) : (
        <Page404 />
      )}
    </div>
  );
};

ProductPage.getInitialProps = async (ctx: NextPageContext) => {
  const { query } = ctx;
  const sectionList = await getSections(PRODUCT_CATALOG_ID);
  const currentProduct = await getProductByCode({
    blockId: PRODUCT_CATALOG_ID,
    code: query.product
  });

  const currentSection: Section = sectionList.find(
    (item) => item.code === query.section
  );

  return {
    product:
      currentProduct.name === 'NotFoundError' ? undefined : currentProduct,
    section: currentSection
  };
};

export default ProductPage;
