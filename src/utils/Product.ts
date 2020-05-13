import { Product } from '../models';
import { ElementProperty } from '../models/ElementProperty';
import { PROPERTY_PRICE_ID } from '../constants';

export const getPriceProperty = (product: Product): ElementProperty => {
  return product.properties.find(
    (property) => parseInt(property.propertyId, 0) === PROPERTY_PRICE_ID
  );
};

export const getPrice = (product: Product): number => {
  const priceProperty: ElementProperty = product.properties.find(
    (property) => parseInt(property.propertyId, 0) === PROPERTY_PRICE_ID
  );
  return parseInt(priceProperty.value, 0);
};
