import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { CATALOG_NAME } from '../../constants';
import { Product, Section } from '../../models';
import { makeStyles } from '@material-ui/styles';

type Props = {
  product: Product;
  section: Section;
};

const useStyles = makeStyles({
  textStyle: {
    maxWidth: '30vw',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

export const ProductBreadcrumbs = (props: Props) => {
  const classes = useStyles();
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
        <Typography variant={textVariant} className={classes.textStyle}>
          {section.name}
        </Typography>
      </Link>
      <Typography
        variant={textVariant}
        color="textPrimary"
        className={classes.textStyle}
      >
        {product.name}
      </Typography>
    </Breadcrumbs>
  );
};
