import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

type Props = {
  sectionName: string;
};

export const ShopBreadcrumbs = (props: Props) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/">
        Главная
      </Link>
      <Link color="inherit" href="/mirra-test/">
        Каталог
      </Link>
      <Typography color="textPrimary">{props.sectionName}</Typography>
    </Breadcrumbs>
  );
};