import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { AgGridReact } from 'ag-grid-react';
import { AdminBreadcrumbs } from '../../components';
import { Subscription, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  ADMIN_CATALOG_COL_DEFS,
  PRODUCT_CATALOG_ID,
  ADMIN_CATALOG_RECORD_NAME
} from '../../constants';
import { getSections } from '../../services';
import '../Layout.scss';
import { Section, AdminCatalogRow } from '../../models';
import { retrieveItem, storeItem } from '../../utils/Storage';
import { getTopLevelSections, getSubSections } from '../../utils/Section';

const AdminCatalogPage = () => {
  const [curSection, setCurSection] = useState<number>(
    retrieveItem(ADMIN_CATALOG_RECORD_NAME)
  );
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

  // tslint:disable-next-line: no-any
  const onRowClicked = (event: any) => {
    const rowSelected: AdminCatalogRow = event.data;
    // tslint:disable-next-line: no-console
    console.log(rowSelected);
    if (rowSelected.isSection) {
      setCurSection(rowSelected.id);
      storeItem(ADMIN_CATALOG_RECORD_NAME, rowSelected.id);
      updateGrid();
    }
  };

  const updateGrid = () => {
    const obs1 = from(
      new Promise((_resolve) =>
        _resolve(setCurSection(retrieveItem(ADMIN_CATALOG_RECORD_NAME)))
      )
    );
    const obs2 = from(getSections(PRODUCT_CATALOG_ID));
    subscriptions.add(
      obs1
        .pipe(
          switchMap(() => obs2)
        )
        .subscribe((resp) => {
          const filteredSections = curSection
            ? getSubSections(resp, curSection)
            : getTopLevelSections(resp);
          const data = filteredSections.map((section: Section) => {
            const row: AdminCatalogRow = {
              id: section.id,
              name: section.name,
              active: section.active,
              isSection: true,
              rowItem: section
            };

            return row;
          });
          setGrid({ ...grid, rowData: data });
        })
    );
  };

  const onGridReady = () => {
    updateGrid();
  };

  return (
    <div className="page-root-admin-layout">
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
                onRowClicked={onRowClicked}
              ></AgGridReact>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminCatalogPage;
