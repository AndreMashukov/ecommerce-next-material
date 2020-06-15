import { OrderProps } from './OrderProps';

export interface Order {
  id?: number;
  userId: string;
  sessionId: string;
  deliveryId: number;
  price: number;
  props?: OrderProps;
}
