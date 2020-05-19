import React from 'react';
import { getSections, getProductByCode } from '../../../services';
import { PRODUCT_CATALOG_ID, CATALOG_NAME } from '../../../constants';
import { Section, Product } from '../../../models';
import { NextPageContext } from 'next';
import { handleSession } from '../../../utils/handleSession';
import {
  ProductBreadcrumbs,
  ProductNotFound,
  ProductDetail
} from '../../../components';
import Page404 from '../../404';

interface Props {
  _sessionId: number;
  _product: Product;
  _section: Section;
}

const ProductPage = (props: Props) => {
  const { _product, _section } = props;

  return (
    <>
      {_product ? (
        <div>
          <div style={{ marginBottom: '30px' }}>
            <ProductBreadcrumbs product={_product} section={_section} />
          </div>
          <ProductDetail product={_product} section={_section} />
        </div>
      ) : _section ? (
        <ProductNotFound url={`/${CATALOG_NAME}/${_section.code}`} />
      ) : (
        <Page404 />
      )}
      }
    </>
  );
};

ProductPage.getInitialProps = async (ctx: NextPageContext) => {
  const { query } = ctx;
  const sectionList = await getSections(PRODUCT_CATALOG_ID);
  const currentProduct = await getProductByCode({
    blockId: PRODUCT_CATALOG_ID,
    code: query.product
  });
  const session = await handleSession(ctx);
  const currentSection: Section = sectionList.find(
    (item) => item.code === query.section
  );

  return {
    _sessionId: session._sessionId,
    _product:
      currentProduct.name === 'NotFoundError' ? undefined : currentProduct,
    _section: currentSection
  };
};

export default ProductPage;
