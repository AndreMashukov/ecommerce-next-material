import { CartItem } from '../../../models';
import { CartAction, CartState } from './models';
import TYPES from './types';
import { addToCart, getCart, removeFromCart } from '../../../services/CartApi';

const cartRemoveReducer = async (
  action: CartAction,
  callback: (newState: CartState) => void
) => {
  await removeFromCart(action.sessionId, parseInt(action.id, 0));
  const cart = await getCart(action.sessionId);
  const updatedCart: CartItem[] = [];
  cart.forEach((item) => {
    if (item.productId !== parseInt(action.id, 0)) {
      updatedCart.push(item);
    }
  });
  callback({ items: updatedCart });
};

const cartAddReducer = async (
  action: CartAction,
  state: CartState,
  callback: (newState: CartState) => void
) => {
  const result = await addToCart(action.item);
  if (result.ok) {
    callback({
      ...state,
      items: await getCart(action.sessionId),
      httpStatus: result
    });
  } else {
    callback({ ...state, httpStatus: result });
  }
};

export default async function cartReducer(
  state: CartState,
  action: CartAction
): Promise<CartState> {
  return new Promise(async (_resolve) => {
    switch (action.type) {
      case TYPES.CART_GET:
        _resolve({ items: await getCart(action.sessionId) });
        break;
      case TYPES.CART_REMOVE:
        cartRemoveReducer(action, _resolve);
        break;
      case TYPES.CART_ADD:
        cartAddReducer(action, state, _resolve);
        break;
      default:
        _resolve(state);
        break;
    }
  });
}
