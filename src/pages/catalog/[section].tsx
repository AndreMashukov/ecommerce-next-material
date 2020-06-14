import React from 'react';
import { Product } from '../../models/Product';
import { getProducts, getSections } from '../../services/CatalogApi';
import { PRODUCT_CATALOG_ID } from '../../constants';
import { Section } from '../../models';
import { Grid, Typography } from '@material-ui/core';
import { NextPageContext } from 'next';
import { ProductList, CatalogBreadcrumbs } from '../../components/shared';
import Page404 from '../404';
import '../Layout.scss';

interface Props {
  products: Product[];
  sections: Section[];
  currentSection: string;
}

function getSectionByCode(sections: Section[], code: string): Section {
  return sections.find((item) => item.code === code);
}

const SectionPage = (props: Props) => {
  const { sections, currentSection } = props;
  let sectionName;
  try {
    sectionName = getSectionByCode(sections, currentSection).name;
  } catch (err) {
    sectionName = undefined;
  }

  return (
    <div className="page-root-layout">
      {sectionName ? (
        <div>
          <div style={{ marginBottom: '30px' }}>
            <CatalogBreadcrumbs sectionName={sectionName} />
          </div>
          <Grid
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            spacing={2}
            container
            style={{ marginBottom: '20px', padding: '30px' }}
          >
            <Grid item xs={6}>
              <Typography
                variant="h4"
                color="textPrimary"
                style={{ fontWeight: 'bold' }}
              >
                {sectionName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" color="textPrimary">
                <span
                  dangerouslySetInnerHTML={{
                    __html: `${
                      getSectionByCode(sections, currentSection).description
                    }`
                  }}
                />
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid item xs={12}>
              <ProductList {...props} />
            </Grid>
          </Grid>
        </div>
      ) : (
        <div>
          <Page404 />
        </div>
      )}
    </div>
  );
};

SectionPage.getInitialProps = async (ctx: NextPageContext) => {
  const productList = await getProducts({
    blockId: PRODUCT_CATALOG_ID,
    sectionCode: ctx.query.section
  });
  const sectionList = await getSections(PRODUCT_CATALOG_ID);
  return {
    products: [].concat.apply([], productList),
    sections: sectionList,
    currentSection: ctx.query.section
  };
};

export default SectionPage;
