import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { AgGridReact } from 'ag-grid-react';
import { GridApi } from 'ag-grid-community';
import { AdminBreadcrumbs } from '../../components';
import { Subscription, from } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { PRODUCT_CATALOG_ID, ADMIN_CATALOG_RECORD_NAME } from '../../constants';
import { getSections, getProductsShallow } from '../../services';
import '../Layout.scss';
import { Section, AdminCatalogRow, ADMIN_CATALOG_COL_DEFS } from '../../models';
import { retrieveItem, storeItem, removeItem } from '../../utils/Storage';
import {
  getTopLevelSections,
  getSubSections,
  getParentSection
} from '../../utils/Section';
import { IconCellRenderer } from '../../components';
import { getPrice } from '../../utils/Product';

let gridApi: GridApi;

interface Props {
  sections: Section[];
  currentSection: number;
}

const subscriptions = new Subscription();

const AdminCatalogPage: NextPage<Props> = (props: Props) => {
  const { sections, currentSection } = props;
  const frameworkComponents = {
    iconCellRender: IconCellRenderer
  };
  const [catalogRows, setCatalogRows] = useState<AdminCatalogRow[]>([]);
  const [curSection, setCurSection] = useState<number>(currentSection);

  const products: AdminCatalogRow[] = [];
  const obsProducts$ = from(
    curSection
      ? getProductsShallow({
          blockId: PRODUCT_CATALOG_ID,
          sectionId: curSection
        })
      : new Promise((_resolve) => _resolve([]))
  );
  const filteredSections = curSection
    ? getSubSections(sections, curSection)
    : getTopLevelSections(sections);
  const data = filteredSections.map((section: Section) => {
    const row: AdminCatalogRow = {
      id: section.id,
      name: section.name,
      active: section.active === 'Y' ? 'Да' : 'Нет',
      isSection: true,
      rowItem: section
    };

    return row;
  });

  const [grid] = useState({
    columnDefs: ADMIN_CATALOG_COL_DEFS,
    rowData: data.concat(products),
    defaultColDef: {
      sortable: true,
      resizable: true,
      minWidth: 50,
      flex: 1
    },
    rowSelection: 'multiple'
  });

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
    setCatalogRows(data);
    const obsSections$ = from(getSections(PRODUCT_CATALOG_ID));

    subscriptions.add(
      obsProducts$
        .pipe(
          tap((resp) => {
            if (Array.isArray(resp)) {
              resp.forEach((prod) => {
                products.push({
                  id: prod.id,
                  name: prod.name,
                  price: `${getPrice(prod)} ₽`,
                  active: prod.active === 'Y' ? 'Да' : 'Нет',
                  isSection: false,
                  rowItem: prod
                });
              });
              setCatalogRows(data.concat(products));
            }
          }),
          switchMap(() => obsSections$)
        )
        .subscribe()
    );
  };

  useEffect(() => {
    gridApi && gridApi.setRowData(catalogRows);
  }, [catalogRows]);

  // tslint:disable-next-line: no-any
  const onGridReady = (params: any) => {
    gridApi = params.api;
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
            <Button onClick={() => handleLevelUp()}>На уровень вверх</Button>
            <Button>Добавить товар</Button>
            <Button>Добавить раздел</Button>
          </ButtonGroup>
          {process.browser && (
            <div
              className="ag-theme-material"
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
                frameworkComponents={frameworkComponents}
              ></AgGridReact>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

AdminCatalogPage.getInitialProps = async () => {
  const sections = await getSections(PRODUCT_CATALOG_ID);
  const currentSection = parseInt(retrieveItem(ADMIN_CATALOG_RECORD_NAME), 0);
  console.log(currentSection);
  return {
    sections,
    currentSection
  };
};

export default AdminCatalogPage;
