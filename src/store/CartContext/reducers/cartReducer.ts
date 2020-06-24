import { CartItem } from '../../../models';
import { CartAction, CartState } from './models';
import TYPES from './types';
import {
  addToCart,
  getCart,
  removeFromCart,
  decrementQty
} from '../../../services/CartApi';
import { Subscription, from } from 'rxjs';
import { tap } from 'rxjs/operators';

const cartGetReducer = async (
  action: CartAction,
  callback: (newState: CartState) => void,
  subscriptions: Subscription
) => {
  subscriptions.add(
    from(getCart(action.sessionId))
      .pipe(
        tap((items) => {
          callback({ items });
        })
      )
      .subscribe()
  );
};

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

const cartDecrementReducer = async (
  action: CartAction,
  state: CartState,
  callback: (newState: CartState) => void
) => {
  const result = await decrementQty(action.item);
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
  action: CartAction,
  subscriptions: Subscription
): Promise<CartState> {
  return new Promise(async (_resolve) => {
    switch (action.type) {
      case TYPES.CART_GET:
        cartGetReducer(action, _resolve, subscriptions);
        break;
      case TYPES.CART_REMOVE:
        cartRemoveReducer(action, _resolve);
        break;
      case TYPES.CART_ADD:
        cartAddReducer(action, state, _resolve);
        break;
      case TYPES.CART_DECREMENT:
        cartDecrementReducer(action, state, _resolve);
        break;
      default:
        _resolve(state);
        break;
    }
  });
}
