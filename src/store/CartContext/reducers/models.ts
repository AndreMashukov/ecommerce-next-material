import { CartItem } from '../../../models';
import TYPES from './types';

export interface CartState {
  items: CartItem[];
  httpStatus?: Response;
}

export interface CartAction {
  type: TYPES;
  id?: string;
  item?: CartItem;
  sessionId: string;
}