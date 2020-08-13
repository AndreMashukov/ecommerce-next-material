import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { AdminBreadcrumbs } from '../../components';
import '../Layout.scss';

const AdminCatalogPage = () => {
  return (
    <div className="page-root-layout">
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
            Каталог
          </Typography>
        </Grid>
        <Grid item>
          <AdminBreadcrumbs name="Каталог" />
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminCatalogPage;
