export interface CartItem {
  fuserId: number;
  blockId: number;
  productId: number;
  name?: string;
  price: number;
  quantity: number;
  currency: string;
}
