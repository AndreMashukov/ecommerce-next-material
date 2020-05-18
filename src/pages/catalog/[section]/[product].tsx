import React from 'react';
import { getSections } from '../../../services/CatalogApi';
import { PRODUCT_CATALOG_ID } from '../../../constants';
import { Section } from '../../../models';
// import { Grid, Typography } from '@material-ui/core';
import { NextPageContext } from 'next';
// import { ProductList, ShopBreadcrumbs } from '../components/shared';
import { handleSession } from '../../../utils/handleSession';
// import Page404 from './404';

interface Props {
  sections: Section[];
  _sessionId: number;
}


const SectionSlugPage = (props: Props) => {
  const { sections } = props;

  return (
    <div>
      {sections.map(section => (
        <div key={`catalog_${section.code}`}>
          {section.name}
        </div>
      ))}
    </div>
  );
};

SectionSlugPage.getInitialProps = async (ctx: NextPageContext) => {
  const sectionList = await getSections(PRODUCT_CATALOG_ID);
  const session = await handleSession(ctx);
  // tslint:disable-next-line: no-console
  console.log(ctx.query);
  return {
    sections: sectionList,
    _sessionId: session._sessionId
  };
};

export default SectionSlugPage;
