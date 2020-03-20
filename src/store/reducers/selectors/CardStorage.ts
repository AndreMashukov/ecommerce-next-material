import  { Product } from '../../../models';

class CartStorage {
  private key = 'persist:cart';

  public getProductsCart(): Product[] {
    try {
      const products = JSON.parse(localStorage.getItem(this.key) || '[]');
      return products;
    } catch (error) {
      // tslint:disable-next-line: no-console
      console.log(error);
      return [];
    }
  }

  private setProductsToCart(products: Product[]): void {
    localStorage.setItem(this.key, JSON.stringify(products || []));
  }

  public addProductToCart(product: Product): void {
    const products = [...this.getProductsCart(), product];
    this.setProductsToCart(products);
  }

  public removeProductOfCart(id: string = '0'): void {
    const products = this.getProductsCart().filter(p => p.id, 0 !== parseInt(id, 0));
    this.setProductsToCart(products);
  }

  public clearCart(): void {
    localStorage.setItem(this.key, '[]');
  }
}
export default new CartStorage();
