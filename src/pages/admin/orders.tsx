import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import '../Layout.scss';
import { AdminBreadcrumbs } from '../../components';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const AdminOrdersPage = () => {
  const [grid] = useState({
    columnDefs: [
      {
        headerName: 'ID',
        field: 'id',
        checkboxSelection: true
      },
      {
        headerName: 'Регион',
        field: 'region'
      },
      {
        headerName: 'Адрес доставки',
        field: 'address'
      },
      {
        headerName: 'Сумма',
        field: 'price'
      },
      {
        headerName: 'Покупатель',
        field: 'buyer'
      }
    ],
    rowData: [
      {
        id: 'Toyota',
        region: 'Celica',
        address: 'Address',
        price: 35000
      },
      {
        id: 'Ford',
        region: 'Mondeo',
        address: 'Address',
        price: 32000
      },
      {
        id: 'Porsche',
        region: 'Boxter',
        address: 'Address',
        price: 72000
      }
    ],
    defaultColDef: {
      sortable: true,
      resizable: true,
      flex: 2,
      minWidth: 150
    },
    rowSelection: 'multiple'
  });
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
            Заказы
          </Typography>
        </Grid>
        <Grid item>
          <AdminBreadcrumbs name="Заказы" />
        </Grid>
        <Grid item>
          <div
            className="ag-theme-alpine"
            style={{
              height: '70vh',
              width: '80vw',
              padding: '10px'
            }}
          >
            <AgGridReact
              columnDefs={grid.columnDefs}
              rowData={grid.rowData}
              defaultColDef={grid.defaultColDef}
            ></AgGridReact>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminOrdersPage;
