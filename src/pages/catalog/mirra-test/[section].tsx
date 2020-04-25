import React from 'react';
import { Product } from '../../../models/Product';
import { getProducts, getSections } from '../../../services/CatalogApi';
import { PRODUCT_CATALOG_ID } from '../../../constants';
import { Section } from '../../../models';
import { Grid } from '@material-ui/core';
import { NextPageContext } from 'next';
import { ProductList } from '../../../components/ProductList/ProductList';
import { handleSession } from '../../../utils/handleSession';

interface Props {
  products: Product[];
  sections: Section[];
  currentSection: string;
  _sessionId: number;
}

const SectionPage = (props: Props) => {
  return (
    <div>
      <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={2}>
        <Grid item xs={12}>
          <ProductList {...props} />
        </Grid>
      </Grid>
    </div>
  );
};

SectionPage.getInitialProps = async (ctx: NextPageContext) => {
  const productList = await getProducts({ blockId: PRODUCT_CATALOG_ID, sectionCode: ctx.query.section });
  const sectionList = await getSections(PRODUCT_CATALOG_ID);
  const session = await handleSession(ctx);
  return {
    products: [].concat.apply([], productList),
    sections: sectionList,
    currentSection: ctx.query.section,
    _sessionId: session._sessionId
  };
};

export default SectionPage;
