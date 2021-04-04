import { CartItem } from '../models';

export const getCartItemsNumber = (cart: CartItem[]) => {
  return cart.length > 0 ? cart.reduce((itemsNumber, item) => {
    itemsNumber += item.quantity;

    return itemsNumber;
  }, 0): 0;
};


export const getCartTotal = (cart: CartItem[]) => {
  return cart.length > 0 ? cart.reduce((total, item) => {
    total += item.quantity * item.price;

    return total;
  }, 0) : 0;
};
