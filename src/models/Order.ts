import { OrderProps } from './OrderProps';

export interface Order {
  id?: number;
  userId: string;
  sessionId: string;
  props?: OrderProps;
}
