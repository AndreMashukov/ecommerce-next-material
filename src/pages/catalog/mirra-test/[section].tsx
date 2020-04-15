import React from 'react';
import { Product } from '../../../models/Product';
import { getProducts, getSections } from '../../../services/CatalogApi';
import { PRODUCT_CATALOG_ID } from '../../../constants';
import { Section } from '../../../models';
import { Grid } from '@material-ui/core';
import { NextPageContext } from 'next';
import { ProductList } from '../../../components/ProductList/ProductList';

interface Props {
  products: Product[];
  sections: Section[];
  currentSection: string;
}

export default class extends React.Component<Props> {
  static async getInitialProps(ctx: NextPageContext) {
    const productList = await getProducts({blockId: PRODUCT_CATALOG_ID,
      sectionCode: ctx.query.section});
    const sectionList = await getSections(PRODUCT_CATALOG_ID);
    // tslint:disable-next-line: no-console
    console.log(ctx.req.headers.cookie);
    return {
      products: [].concat.apply([], productList),
      sections: sectionList,
      currentSection: ctx.query.section
    };
  }

  render() {
    return (
      <div>
        <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={2}>
          <Grid item xs={12}>
            <ProductList {...this.props} />
          </Grid>
        </Grid>
      </div>
    );
  }
}
