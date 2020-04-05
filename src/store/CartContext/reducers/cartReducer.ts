import { Product, CartItem } from '../../../models';
import TYPES from './types';
import { addToCart, getCart, removeFromCart } from '../../../services/CartApi';

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
  return new Promise(async _resolve => {
    let cart: CartItem[] = [];
    switch (action.type) {
      case TYPES.CART_GET:
        cart = await getCart(1);
        _resolve({ items: cart });
        break;
      case TYPES.CART_CLEAR:
        _resolve({ items: cart });
        break;
      case TYPES.CART_REMOVE:
        await removeFromCart(1, parseInt(action.id, 0));
        cart = await getCart(1);
        const updatedCart: CartItem[] = [];
        cart.forEach(item => {
          if (item.productId !== parseInt(action.id, 0)) {
            updatedCart.push(item);
          }
        });
        _resolve({ items: updatedCart});
        break;
      case TYPES.CART_ADD:
        await addToCart(action.item);
        _resolve({ items: await getCart(1) });
        break;
      default:
        _resolve(state);
        break;
    }
  });
}
