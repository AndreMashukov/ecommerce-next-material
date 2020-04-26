import React from 'react';
import { Product } from '../../../models/Product';
import { getProducts, getSections } from '../../../services/CatalogApi';
import { PRODUCT_CATALOG_ID } from '../../../constants';
import { Section } from '../../../models';
import { Grid, Typography } from '@material-ui/core';
import { NextPageContext } from 'next';
import { ProductList } from '../../../components/ProductList/ProductList';
import { handleSession } from '../../../utils/handleSession';

interface Props {
  products: Product[];
  sections: Section[];
  currentSection: string;
  _sessionId: number;
}

function getSectionByCode(sections: Section[], code: string): Section {
  return sections.find(item => item.code === code);
}

const SectionPage = (props: Props) => {
  const { sections, currentSection } = props;
  return (
    <div>
      <Grid direction="row" justify="space-around" alignItems="center"
        spacing={2} container style={{marginBottom: '20px'}}>
        <Grid item xs={4}>
          <Typography variant="h4" color="textPrimary">
            {getSectionByCode(sections, currentSection).name}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2" color="textPrimary">
            <div dangerouslySetInnerHTML={{__html:
              `${getSectionByCode(sections, currentSection).description}`}} />
          </Typography>
        </Grid>
      </Grid>
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
