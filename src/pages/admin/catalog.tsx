import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { AgGridReact } from 'ag-grid-react';
import { AdminBreadcrumbs } from '../../components';
import { Subscription } from 'rxjs';
import { ADMIN_CATALOG_COL_DEFS } from '../../constants';
import '../Layout.scss';

const AdminCatalogPage = () => {
  const [grid] = useState({
    columnDefs: ADMIN_CATALOG_COL_DEFS,
    rowData: [],
    defaultColDef: {
      sortable: true,
      resizable: true,
      flex: 1,
      minWidth: 120
    },
    rowSelection: 'multiple'
  });

  const subscriptions = new Subscription();

  useEffect(() => {
    return () => {
      subscriptions.unsubscribe();
    };
  }, []);

  // const onGridReady = () => {};

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
        <Grid item>
          {process.browser && (
            <div
              className="ag-theme-alpine"
              style={{
                height: '70vh',
                width: '80vw',
                maxWidth: '1200px',
                padding: '10px'
              }}
            >
              <AgGridReact
                columnDefs={grid.columnDefs}
                rowData={grid.rowData}
                defaultColDef={grid.defaultColDef}
                // onGridReady={onGridReady}
              ></AgGridReact>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminCatalogPage;
