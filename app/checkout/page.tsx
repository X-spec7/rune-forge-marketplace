'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import { CartItem } from '@/types';
import { CartService } from '@/services/CartService';

export default function CheckoutPage() {
  const router = useRouter();
  const cartService = CartService.getInstance();

  const [items, setItems] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setItems(cartService.getCart());
  }, []);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleRemove = async (id: string) => {
    await cartService.removeFromCart(id);
    setItems(cartService.getCart());
  };

  const handleCompleteCheckout = async () => {
    if (items.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    setIsProcessing(true);
    await cartService.clearCart();
    setItems([]);
    setIsProcessing(false);
    alert('Thank you for your purchase! Your RUNE assets are now bound to your sovereignty stack.');
    router.push('/');
  };

  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />

      <Navigation cartCount={items.length} onCartToggle={() => router.push('/')} />

      <section className="relative z-10 pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => router.back()}
            className="text-sm text-bronze hover:text-gold transition-colors mb-6"
          >
            ← Back
          </button>

          <h1 className="text-3xl md:text-4xl font-bold text-gold-light mb-6">
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-black/80 border border-gold/30 rounded-2xl p-6 backdrop-blur-md">
              <h2 className="text-xl font-semibold text-gold mb-4">
                Order Summary
              </h2>

              {items.length === 0 ? (
                <p className="text-bronze py-6">
                  Your cart is empty. Add some models, plugins, or tools to continue.
                </p>
              ) : (
                <div className="space-y-4">
                  {items.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border-b border-gold/20 pb-4 last:border-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                      />
                      <div className="flex-1">
                        <div className="text-gold-light font-semibold">
                          {item.name}
                        </div>
                        <div className="text-gold font-bold">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-500 hover:text-red-400 text-sm font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-black/80 border border-gold/30 rounded-2xl p-6 backdrop-blur-md flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-gold mb-2">
                Payment
              </h2>
              <p className="text-sm text-bronze mb-4">
                This is a mock checkout. No real payment is processed, but the flow
                mirrors how a production checkout could look.
              </p>

              <div className="flex justify-between items-center text-lg font-bold text-gold mb-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCompleteCheckout}
                disabled={isProcessing || items.length === 0}
                className="w-full px-6 py-3 bg-gradient-to-r from-gold to-bronze text-bg font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_5px_20px_rgba(212,175,55,0.5)] disabled:opacity-60 disabled:hover:scale-100"
              >
                {isProcessing ? 'Processing...' : 'Complete Purchase'}
              </button>

              <button
                onClick={() => router.push('/')}
                className="w-full px-6 py-3 bg-gold/10 border border-gold text-gold font-semibold rounded-lg transition-all duration-300 hover:bg-gold/20"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


