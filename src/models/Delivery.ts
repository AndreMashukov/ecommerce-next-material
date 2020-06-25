export interface Delivery {
  delivery_id: number;
  delivery_name: string;
  delivery_period_from: number;
  delivery_period_to: number;
  delivery_period_type: string;
  delivery_order_price_from: number;
  delivery_order_price_to: number;
  delivery_active: string;
  delivery_price: number;
  delivery_description: string;
}

export interface NoSuffixDelivery {
  id: number;
  name: string;
  period_from: number;
  period_to: number;
  period_type: string;
  order_price_from: number;
  order_price_to: number;
  active: string;
  price: number;
  description: string;
}