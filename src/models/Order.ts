import { OrderProps } from './OrderProps';
import { User } from './User';
import { CartItem } from './CartItem';
import { NoSuffixDelivery } from './Delivery';
import { NoSuffixPaySystem } from './PaySystem';

export interface Order {
  id?: number;
  userId: string;
  sessionId: string;
  deliveryId: number;
  paySystemId: number;
  price: number;
  comment?: string;
  props?: OrderProps;
  payed?: string;
  datePayed?: string;
  user?: User;
  cart?: CartItem[];
  delivery?: NoSuffixDelivery;
  paySystem?: NoSuffixPaySystem;
  dateInsert?: string;
}
export type OrderView = Required<Order>;
export type OrderViewList = {orders: OrderView[]};

