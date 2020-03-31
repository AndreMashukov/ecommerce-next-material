import { Product } from '../../models';
import TYPES from './types';
import { clearSelect, removeSelect, addSelect } from './selectors/cartSelectors';

interface CartAction {
  type: TYPES;
  id?: string;
  product?: Product;
}

interface CartState {
  products: Product[];
}

export default async function cartReducer(state: CartState, action: CartAction): Promise<CartState> {
  switch (action.type) {
    case TYPES.CART_CLEAR:
      return new Promise( (_resolve) => _resolve( { products: clearSelect() }));
    case TYPES.CART_REMOVE:
      return new Promise( (_resolve) => _resolve( {
        products: removeSelect(state.products, action.id),
      }));
    case TYPES.CART_ADD:
      return new Promise( (_resolve) => _resolve( {
        products: addSelect(state.products, action.product),
      }));
    default:
      return new Promise( (_resolve) => _resolve( state));
  }
}
