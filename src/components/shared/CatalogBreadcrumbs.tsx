import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { CATALOG_NAME } from '../../constants';

type Props = {
  sectionName: string;
};

export const CatalogBreadcrumbs: React.FC<Props> = (props: Props) => {
  const catalogPath = '/' + CATALOG_NAME;
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/">
        Главная
      </Link>
      <Link color="inherit" href={catalogPath}>
        Каталог
      </Link>
      <Typography color="textPrimary">{props.sectionName}</Typography>
    </Breadcrumbs>
  );
};