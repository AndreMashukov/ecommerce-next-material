import { Product } from '../models';
import { ElementProperty } from '../models/ElementProperty';
import { PRODUCT_PROPERTIES } from '../constants';

export const getPriceProperty = (product: Product): ElementProperty => {
  return product.properties.find(
    (property) => parseInt(property.propertyId, 0) === PRODUCT_PROPERTIES.PRICE
  );
};

export const getPrice = (product: Product): number => {
  const priceProperty: ElementProperty = product.properties.find(
    (property) => parseInt(property.propertyId, 0) === PRODUCT_PROPERTIES.PRICE
  );
  return parseInt(priceProperty.value, 0);
};
