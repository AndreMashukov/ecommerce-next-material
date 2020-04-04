import { Product, CartItem } from '../../models';
import TYPES from './types';
import { clearSelect, removeSelect, addSelect } from './selectors/cartSelectors';
import { addToCart, getCart } from '../../services/CartApi';

interface CartAction {
  type: TYPES;
  id?: string;
  product?: Product;
  item?: CartItem;
}

interface CartState {
  products?: Product[];
  items?: CartItem[];
}

export default async function cartReducer(state: CartState, action: CartAction): Promise<CartState> {
  switch (action.type) {
    case TYPES.CART_GET:
      return new Promise(async _resolve => {
        getCart(1).then(resp => {
          _resolve({
            items: resp
          });
        });
      });
    case TYPES.CART_CLEAR:
      return new Promise(_resolve => _resolve({ products: clearSelect() }));
    case TYPES.CART_REMOVE:
      return new Promise(_resolve =>
        _resolve({
          products: removeSelect(state.products, action.id),
        }),
      );
    case TYPES.CART_ADD:
      await addToCart(action.item);
      return new Promise(_resolve =>
        _resolve({
          products: addSelect(state.products, action.product),
        }),
      );
    default:
      return new Promise(_resolve => _resolve(state));
  }
}
