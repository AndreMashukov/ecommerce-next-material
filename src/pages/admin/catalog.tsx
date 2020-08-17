import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { AgGridReact } from 'ag-grid-react';
import { AdminBreadcrumbs } from '../../components';
import { Subscription, from } from 'rxjs';
import {
  ADMIN_CATALOG_COL_DEFS,
  PRODUCT_CATALOG_ID,
  ADMIN_CATALOG_RECORD_NAME
} from '../../constants';
import { getSections } from '../../services';
import '../Layout.scss';
import { Section, AdminCatalogRow } from '../../models';
import { retrieveItem, storeItem, removeItem } from '../../utils/Storage';
import {
  getTopLevelSections,
  getSubSections,
  getParentSection
} from '../../utils/Section';

const AdminCatalogPage = () => {
  const [sections, setSections] = useState<Section[]>([]);
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

  useEffect(() => {
    updateGrid();
  }, [curSection]);

  // tslint:disable-next-line: no-any
  const onRowClicked = (event: any) => {
    const rowSelected: AdminCatalogRow = event.data;
    if (rowSelected.isSection) {
      setCurSection(rowSelected.id);
      storeItem(ADMIN_CATALOG_RECORD_NAME, rowSelected.id);
    }
  };

  const handleLevelUp = () => {
    if (curSection) {
      const parentId = getParentSection(sections, curSection);
      if (parentId) {
        setCurSection(parentId);
        storeItem(ADMIN_CATALOG_RECORD_NAME, parentId);
      } else {
        setCurSection(null);
        removeItem(ADMIN_CATALOG_RECORD_NAME);
      }
    }
  };

  const updateGrid = () => {
    const obs = from(getSections(PRODUCT_CATALOG_ID));
    subscriptions.add(
      obs.subscribe((resp) => {
        setSections(resp);
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
          <ButtonGroup
            size="small"
            aria-label="small outlined button group"
            style={{ paddingLeft: '10px' }}
          >
            <Button onClick={() => handleLevelUp()}>
              На один уровень вверх
            </Button>
            <Button>Добавить товар</Button>
            <Button>Добавить раздел</Button>
          </ButtonGroup>
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
