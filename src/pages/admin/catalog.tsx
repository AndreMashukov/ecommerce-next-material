import React, { useState, useEffect, useContext, memo } from 'react';
import { NextPage } from 'next';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { AgGridReact } from 'ag-grid-react';
import { GridApi } from 'ag-grid-community';
import { AdminBreadcrumbs } from '../../components';

import { ADMIN_CATALOG_RECORD_NAME } from '../../constants';
import '../Layout.scss';
import { AdminCatalogRow, ADMIN_CATALOG_COL_DEFS } from '../../models';
import { retrieveItem, storeItem, removeItem } from '../../utils/Storage';
import {
  getParentSectionId,
  getSectionRows,
  getSectionById
} from '../../utils/Section';
import { getProductRows } from '../../utils/Product';
import { IconCellRenderer } from '../../components';
import { SectonContext } from '../../store/entities/SectionProvider';
import { ProductContext } from '../../store/entities/ProductProvider';

let gridApi: GridApi;

interface Props {
  currentSection: number;
}

const AdminCatalogPage: NextPage<Props> = memo((props: Props) => {
  const { currentSection } = props;
  const { sections, loading: sectionLoading, fetchSections } = useContext(
    SectonContext
  );
  const { products, loading: productsLoading, fetchProducts } = useContext(
    ProductContext
  );

  const frameworkComponents = {
    iconCellRender: IconCellRenderer
  };

  const [curSection, setCurSection] = useState<number>(currentSection);

  let data = getSectionRows(sections || [], curSection);

  const [grid] = useState({
    columnDefs: ADMIN_CATALOG_COL_DEFS,
    rowData: data.concat(getProductRows(products || [])),
    defaultColDef: {
      sortable: true,
      resizable: true,
      minWidth: 150,
      flex: 1
    },
    rowSelection: 'multiple'
  });

  useEffect(() => {
    fetchSections();
  }, []);

  useEffect(() => {
    updateGrid();
  }, [curSection, sectionLoading, products]);

  useEffect(() => {
    fetchProducts(curSection);
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
      const parentId = getParentSectionId(sections || [], curSection);
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
    data = getSectionRows(sections || [], curSection);
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
          <AdminBreadcrumbs name="Каталог">
            {curSection &&
              getSectionById(sections, curSection) &&
              getSectionById(
                sections,
                getSectionById(sections, curSection).sectionId
              ) && (
                <Typography>
                  {
                    getSectionById(
                      sections,
                      getSectionById(sections, curSection).sectionId
                    ).name
                  }
                </Typography>
              )}
            {curSection && getSectionById(sections, curSection) && (
              <Typography>
                {getSectionById(sections, curSection).name}
              </Typography>
            )}
          </AdminBreadcrumbs>
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
          {!sectionLoading && !productsLoading && (
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
});

AdminCatalogPage.getInitialProps = async () => {
  const currentSection = parseInt(retrieveItem(ADMIN_CATALOG_RECORD_NAME), 0);

  return {
    currentSection
  };
};

export default AdminCatalogPage;
