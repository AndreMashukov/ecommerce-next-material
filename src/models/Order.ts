import { OrderProps } from './OrderProps';

export interface Order {
  id?: number;
  userId: string;
  sessionId: string;
  deliveryId: string;
  props?: OrderProps;
}
