import { OrderProps } from './OrderProps';
import { User } from './User';
import { CartItem } from './CartItem';

export interface Order {
  id?: number;
  userId: string;
  sessionId: string;
  deliveryId: number;
  paySystemId: number;
  price: number;
  comment?: string;
  props?: OrderProps;
  user?: User;
  cart?: CartItem[];
}
