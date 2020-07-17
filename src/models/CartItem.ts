export interface CartItem {
  sessionId: string;
  blockId: number;
  productId: number;
  name?: string;
  price: number;
  quantity: number;
  currency: string;
  packageType?: string;
  skuCode?: string;
  detailPageUrl: string;
  picture?: string;
}
