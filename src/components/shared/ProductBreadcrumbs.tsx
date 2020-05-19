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
  const textVariant = 'body2';

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/">
        <Typography variant={textVariant}>Главная</Typography>
      </Link>
      <Link color="inherit" href={'/' + CATALOG_NAME}>
        <Typography variant={textVariant}>Каталог</Typography>
      </Link>
      <Link color="inherit" href={'/' + CATALOG_NAME + '/' + section.code}>
        <Typography variant={textVariant}>{section.name}</Typography>
      </Link>
      <Typography variant={textVariant} color="textPrimary">
        {product.name}
      </Typography>
    </Breadcrumbs>
  );
};
