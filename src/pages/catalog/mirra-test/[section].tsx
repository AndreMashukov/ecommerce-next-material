import React from 'react';
import { Product } from '../../../models/Product';
import { getProducts, getSections } from '../../../services/CatalogApi';
import { PRODUCT_CATALOG_ID } from '../../../constants';
import { Section } from '../../../models';
import { Grid } from '@material-ui/core';
import { SectionList } from '../../../components/SectionList/SectionList';
import { NextPageContext } from 'next';

interface Props {
  products?: Product[];
  sections: Section[];
}

export default class extends React.Component<Props> {
  static async getInitialProps(ctx: NextPageContext) {
    const productList = await getProducts({blockId: PRODUCT_CATALOG_ID,
      sectionCode: ctx.query.section});
    const sectionList = await getSections(PRODUCT_CATALOG_ID);
    // tslint:disable-next-line: no-console
    console.log(productList);
    return {
      sections: sectionList
    };
  }

  render() {
    return (
      <div>
        <Grid container direction="row" justify="flex-start" spacing={2}>
          <Grid item>
            <SectionList {...this.props} />
          </Grid>
        </Grid>
      </div>
    );
  }
}
