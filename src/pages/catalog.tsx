import React from 'react';
import { getSections } from '../services/CatalogApi';
import { PRODUCT_CATALOG_ID } from '../constants';
import { Section } from '../models';
import { NextPageContext } from 'next';
import { handleSession } from '../utils/handleSession';

interface Props {
  sections: Section[];
  _sessionId: number;
}


const CatalogPage = (props: Props) => {
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

CatalogPage.getInitialProps = async (ctx: NextPageContext) => {
  const sectionList = await getSections(PRODUCT_CATALOG_ID);
  const session = await handleSession(ctx);
  return {
    sections: sectionList,
    _sessionId: session._sessionId
  };
};

export default CatalogPage;
