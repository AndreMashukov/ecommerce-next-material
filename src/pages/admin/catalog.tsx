import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { AgGridReact } from 'ag-grid-react';
import { AdminBreadcrumbs } from '../../components';
import { Subscription, from } from 'rxjs';
import {
  ADMIN_CATALOG_COL_DEFS,
  PRODUCT_CATALOG_ID
} from '../../constants';
import { getSections } from '../../services';
import '../Layout.scss';
import { Section, AdminCatalogRow } from '../../models';

const AdminCatalogPage = () => {
  const [grid, setGrid] = useState({
    columnDefs: ADMIN_CATALOG_COL_DEFS,
    rowData: [],
    defaultColDef: {
      sortable: true,
      resizable: true,
      minWidth: 50,
      flex: 1
    },
    rowSelection: 'multiple'
  });

  const subscriptions = new Subscription();

  useEffect(() => {
    return () => {
      subscriptions.unsubscribe();
    };
  }, []);

  const onGridReady = () => {
    subscriptions.add(
      from(getSections(PRODUCT_CATALOG_ID)).subscribe((resp) => {
        const data = resp.map((section: Section) => {
          const row: AdminCatalogRow = {
            id: section.id,
            name: section.name,
            active: section.active,
            rowItem: section
          };

          return row;
        });
        setGrid({ ...grid, rowData: data });
      })
    );
  };

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
                onGridReady={onGridReady}
              ></AgGridReact>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminCatalogPage;
