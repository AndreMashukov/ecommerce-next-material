import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

type Props = {
  name: string;
  children?: JSX.Element | JSX.Element[];
};

export const AdminBreadcrumbs: React.FC<Props> = (props: Props) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/admin/dashboard">
        Рабочий стол
      </Link>
      <Typography color="textPrimary">{props.name}</Typography>
      {props.children}
    </Breadcrumbs>
  );
};
