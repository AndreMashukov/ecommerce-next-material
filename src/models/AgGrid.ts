export const ADMIN_CATALOG_COL_DEFS = [
  {
    headerName: 'ID',
    field: 'id',
    checkboxSelection: true
  },
  {
    headerName: 'Название',
    cellRenderer: 'iconCellRender'
  },
  {
    headerName: 'Цена',
    field: 'price'
  },
  {
    headerName: 'Акция ',
    field: 'isSpecialOffer'
  },
  {
    headerName: 'Новинка',
    field: 'isNew'
  },
  {
    headerName: 'Лидер продаж',
    field: 'isTopSell'
  },
  {
    headerName: 'Активность',
    field: 'active'
  },
  {
    headerName: 'rowItem',
    field: 'rowItem',
    hide: true
  }
];

export const ADMIN_ORDER_COL_DEFS = [
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
];

