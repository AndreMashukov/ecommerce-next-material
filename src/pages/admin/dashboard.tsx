import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import '../Layout.scss';

const AdminDashboardPage = () => {
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
            Администрирование
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item xs={12}>
          <Grid container direction="column" justify="center">
            <Grid item>
              <Grid
                container
                direction="row"
                justify="flex-start"
                wrap="wrap"
                spacing={2}
              >
                <Grid key={'orders'} item xs={10} sm={6} md={4} lg={3}>
                    Orders
                </Grid>
                <Grid key={'catalog'} item xs={10} sm={6} md={4} lg={3}>
                    Catalog
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboardPage;
