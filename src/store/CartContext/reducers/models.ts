import { CartItem } from '../../../models';
import TYPES from './types';

export interface CartState {
  items: CartItem[];
  httpStatus?: Response;
  // tslint:disable-next-line: no-any
  error?: any;
}

export interface CartAction {
  type: TYPES;
  id?: number;
  item?: CartItem;
  sessionId: string;
}