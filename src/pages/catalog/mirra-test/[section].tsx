import React from 'react';
import { Product } from '../../../models/Product';
import { getProducts } from '../../../services/CatalogApi';


interface Props {
  // tslint:disable-next-line: no-any
  products: Product[];
}

export default class extends React.Component<Props> {
  // tslint:disable-next-line: no-any
  static async getInitialProps(ctx: any) {
    const productList = await getProducts({blockId: 4, sectionCode: ctx.query.section});
    // tslint:disable-next-line: no-console
    console.log(productList);
    return { };
  }

  render() {
    return (
      <div>
        <p>Sections</p>
      </div>
    );
  }
}
