import { CartItem } from '../../../models';
import { CartAction, CartState } from './models';
import TYPES from './types';
import { addToCart, getCart, removeFromCart } from '../../../services/CartApi';

export default async function cartReducer(
  state: CartState,
  action: CartAction
): Promise<CartState> {
  return new Promise(async _resolve => {
    let cart: CartItem[] = [];
    switch (action.type) {
      case TYPES.CART_GET:
        cart = await getCart(action.sessionId);
        _resolve({ items: cart });
        break;
      case TYPES.CART_REMOVE:
        await removeFromCart(action.sessionId, parseInt(action.id, 0));
        cart = await getCart(action.sessionId);
        const updatedCart: CartItem[] = [];
        cart.forEach(item => {
          if (item.productId !== parseInt(action.id, 0)) {
            updatedCart.push(item);
          }
        });
        _resolve({ items: updatedCart});
        break;
      case TYPES.CART_ADD:
        const result = await addToCart(action.item);
        if (result.ok) {
          _resolve({...state, items: await getCart(action.sessionId), httpStatus: result });
        } else {
          _resolve({...state, httpStatus: result});
        }
        break;
      default:
        _resolve(state);
        break;
    }
  });
}
