import { OrderProps } from './OrderProps';
import { User } from './User';
import { CartItem } from './CartItem';
import { NoSuffixDelivery } from './Delivery';
import { PaySystem } from './PaySystem';

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
  delivery?: NoSuffixDelivery;
  paySystem?: PaySystem;
}
