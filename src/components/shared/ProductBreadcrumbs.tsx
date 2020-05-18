import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { CATALOG_NAME } from '../../constants';
import { Product, Section } from '../../models';

type Props = {
  product: Product;
  section: Section;
};

export const ProductBreadcrumbs = (props: Props) => {
  const { product, section } = props;

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/">
        Главная
      </Link>
      <Link color="inherit" href={'/' + CATALOG_NAME}>
        Каталог
      </Link>
      <Link color="inherit" href={'/' + CATALOG_NAME + '/' + section.code}>
        {section.name}
      </Link>
      <Typography color="textPrimary">{product.name}</Typography>
    </Breadcrumbs>
  );
};