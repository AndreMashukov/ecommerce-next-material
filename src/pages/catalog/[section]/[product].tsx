import React from 'react';
import { getSections, getProductByCode } from '../../../services';
import { PRODUCT_CATALOG_ID } from '../../../constants';
import { Section, Product } from '../../../models';
// import { Grid, Typography } from '@material-ui/core';
import { NextPageContext } from 'next';
// import { ProductList, ShopBreadcrumbs } from '../components/shared';
import { handleSession } from '../../../utils/handleSession';
// import Page404 from './404';

interface Props {
  _sessionId: number;
  _product: Product;
  _section: Section;
  _sectionList: Section[];
}

const ProductPage = (props: Props) => {
  const { _sectionList } = props;

  return (
    <div>
      {_sectionList.map((section) => (
        <div key={`catalog_${section.code}`}>{section.name}</div>
      ))}
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
  const session = await handleSession(ctx);

  return {
    _sessionId: session._sessionId,
    _product: currentProduct,
    _section: query.section,
    _sectionList: sectionList
  };
};

export default ProductPage;
