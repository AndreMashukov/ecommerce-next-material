import { PRODUCTS } from '../../global-definitions';

export default class {
  static add(state, item_id, qty) {
    const newState = {...state};
    const product = PRODUCTS.find(p => p.item_id === item_id);
    const cartItem = state.cart.items.find(i => i.item_id === item_id);
    const cartItemIndex = state.cart.items.findIndex(i => i.item_id === item_id);
    if (!cartItem) {
      newState.cart.items.push({
        title: product.title,
        item_id: item_id,
        qty: qty,
        price: product.price
      });
    } else {
      const newQty = parseInt(state.cart.items[cartItemIndex].qty) + parseInt(qty);
      newState.cart.items[cartItemIndex].qty = newQty;
    }

    return newState;
  }

  static remove(state, item_id) {
    const newState = {...state};
    const itemIndex = state.cart.items.findIndex(i => i.item_id === item_id);
    newState.cart.items.splice(itemIndex, 1);

    return newState;
  }
}  