import React, { useState, useEffect, useContext } from 'react';
import { NextPage } from 'next';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { AgGridReact } from 'ag-grid-react';
import { GridApi } from 'ag-grid-community';
import { AdminBreadcrumbs } from '../../components';
import { Subscription } from 'rxjs';

import { ADMIN_CATALOG_RECORD_NAME } from '../../constants';
import '../Layout.scss';
import { AdminCatalogRow, ADMIN_CATALOG_COL_DEFS } from '../../models';
import { retrieveItem, storeItem, removeItem } from '../../utils/Storage';
import { getParentSection } from '../../utils/Section';
import { IconCellRenderer } from '../../components';
import { SectonContext } from '../../store/SectionProvider';
import { ProductContext } from '../../store/ProductProvider';

let gridApi: GridApi;

interface Props {
  currentSection: number;
}

const subscriptions = new Subscription();

const AdminCatalogPage: NextPage<Props> = (props: Props) => {
  const { currentSection } = props;
  const { fetchSections, getSectionRows } = useContext(SectonContext);
  const { result: sections, loading: sectionLoading } = fetchSections;
  const { products, fetchProducts, getProductRows } = useContext(
    ProductContext
  );

  const frameworkComponents = {
    iconCellRender: IconCellRenderer
  };

  const [curSection, setCurSection] = useState<number>(currentSection);

  let data = getSectionRows(curSection);

  const [grid] = useState({
    columnDefs: ADMIN_CATALOG_COL_DEFS,
    rowData: data.concat(getProductRows(products || [])),
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
  }, [curSection, sectionLoading, products]);

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
    fetchProducts(curSection);
    data = getSectionRows(curSection);
    gridApi && gridApi.setRowData(data.concat(getProductRows(products || [])));
  };

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
  const currentSection = parseInt(retrieveItem(ADMIN_CATALOG_RECORD_NAME), 0);

  return {
    currentSection
  };
};

export default AdminCatalogPage;
