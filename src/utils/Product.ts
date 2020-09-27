import { Product, AdminCatalogRow } from '../models';
import { ElementProperty } from '../models/ElementProperty';
import { PRODUCT_PROPERTIES } from '../constants';

export function getProductProperty(
  product: Product,
  propertyId: number
): ElementProperty {
  return product.properties.find(
    (property) => parseInt(property.propertyId, 0) === propertyId
  );
}

export const getPrice = (product: Product): number => {
  const priceProperty: ElementProperty = product.properties.find(
    (property) =>
      parseInt(property.propertyId, 0) === PRODUCT_PROPERTIES.PRICE.id
  );
  return parseInt(priceProperty.value, 0);
};

export const getProductRows = (prods: Product[]): AdminCatalogRow[] => {
  return prods.map((prod) => {
    const obj = {
      id: prod.id,
      name: prod.name,
      price: `${getPrice(prod)} ₽`,
      active: prod.active === 'Y' ? 'Да' : 'Нет',
      isSection: false,
      rowItem: prod
    };
    return obj;
  });
};