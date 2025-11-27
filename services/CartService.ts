import { CartItem } from '@/types';

export class CartService {
  private static instance: CartService;
  private storageKey = 'runeCart';

  private constructor() {}

  static getInstance(): CartService {
    if (!CartService.instance) {
      CartService.instance = new CartService();
    }
    return CartService.instance;
  }

  async addToCart(item: CartItem): Promise<boolean> {
    await this.simulateDelay();
    const cart = this.getCart();
    const existingIndex = cart.findIndex(i => i.id === item.id);

    if (existingIndex >= 0) {
      return false;
    }

    cart.push(item);
    this.saveCart(cart);
    return true;
  }

  async removeFromCart(productId: string): Promise<void> {
    await this.simulateDelay();
    const cart = this.getCart();
    const filtered = cart.filter(item => item.id !== productId);
    this.saveCart(filtered);
  }

  getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : [];
  }

  async clearCart(): Promise<void> {
    await this.simulateDelay();
    this.saveCart([]);
  }

  getCartTotal(): number {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + item.price, 0);
  }

  getCartCount(): number {
    return this.getCart().length;
  }

  private saveCart(cart: CartItem[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(cart));
    }
  }

  private simulateDelay(ms: number = 200): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
