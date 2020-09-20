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
import { tap, switchMap } from 'rxjs/operators';

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
  callback: (newState: CartState) => void,
  subscriptions: Subscription
) => {
  subscriptions.add(
    from(removeFromCart(action.sessionId, action.id))
      .pipe(
        switchMap(() => from(getCart(action.sessionId))),
        tap((cart) => {
          const updatedCart: CartItem[] = [];
          cart.forEach((item) => {
            if (item.productId !== action.id) {
              updatedCart.push(item);
            }
          });
          callback({ items: updatedCart });
        })
      )
      .subscribe()
  );
};

const cartAddReducer = async (
  action: CartAction,
  state: CartState,
  callback: (newState: CartState) => void,
  subscriptions: Subscription
) => {
  let requestResult: Response = null;
  subscriptions.add(
    from(addToCart(action.item))
      .pipe(
        switchMap((result) => {
          if (result.ok) {
            requestResult = result;
            return from(getCart(action.sessionId));
          } else {
            callback({ ...state, httpStatus: result });
            return null;
          }
        }),
        tap((items) => {
          items &&
            callback({
              ...state,
              items,
              httpStatus: requestResult
            });
        })
      )
      .subscribe()
  );
};

const cartDecrementReducer = async (
  action: CartAction,
  state: CartState,
  callback: (newState: CartState) => void,
  subscriptions: Subscription
) => {
  let requestResult: Response = null;
  subscriptions.add(
    from(decrementQty(action.item))
      .pipe(
        switchMap((result) => {
          if (result.ok) {
            requestResult = result;
            return from(getCart(action.sessionId));
          } else {
            callback({ ...state, httpStatus: result });
            return null;
          }
        }),
        tap((items) => {
          items &&
            callback({
              ...state,
              items,
              httpStatus: requestResult
            });
        })
      )
      .subscribe()
  );
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
        cartRemoveReducer(action, _resolve, subscriptions);
        break;
      case TYPES.CART_ADD:
        cartAddReducer(action, state, _resolve, subscriptions);
        break;
      case TYPES.CART_DECREMENT:
        cartDecrementReducer(action, state, _resolve, subscriptions);
        break;
      default:
        _resolve(state);
        break;
    }
  });
}
