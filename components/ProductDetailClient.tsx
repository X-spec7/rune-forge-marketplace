'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { CartItem, Product } from '@/types';
import { CartService } from '@/services/CartService';
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import MiniCart from '@/components/MiniCart';

interface ProductDetailClientProps {
  initialProduct: Product | null;
}

export default function ProductDetailClient({ initialProduct }: ProductDetailClientProps) {
  const router = useRouter();

  const [product] = useState<Product | null>(initialProduct);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartService = CartService.getInstance();

  useEffect(() => {
    // Load cart on mount
    setCartItems(cartService.getCart());
  }, []);

  const handleAddToCart = async () => {
    if (!product) return;

    const success = await cartService.addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    if (success) {
      setCartItems(cartService.getCart());
      setIsCartOpen(true);
      setTimeout(() => setIsCartOpen(false), 3000);
    } else {
      alert('This item is already in your cart!');
    }
  };

  const handleRemoveFromCart = async (productId: string) => {
    await cartService.removeFromCart(productId);
    setCartItems(cartService.getCart());
  };

  if (!product) {
    return (
      <main className="min-h-screen relative">
        <AnimatedBackground />
        <Navigation
          cartCount={cartItems.length}
          onCartToggle={() => setIsCartOpen(!isCartOpen)}
        />
        <section className="relative z-10 pt-32 pb-20 px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center text-bronze">
            Product not found.
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />

      <Navigation
        cartCount={cartItems.length}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
      />

      <section className="relative z-10 pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto bg-black/80 border border-gold/30 rounded-2xl p-8 md:p-10 backdrop-blur-md">
          <button
            onClick={() => router.back()}
            className="text-sm text-bronze hover:text-gold transition-colors mb-6"
          >
            ← Back to marketplace
          </button>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0 flex flex-col items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 mb-4 drop-shadow-[0_0_20px_rgba(212,175,55,0.7)]"
              />
              <span className="inline-block px-4 py-1 bg-gradient-to-r from-gold/20 to-bronze/20 border border-gold rounded-full text-xs uppercase tracking-wider text-gold mb-2">
                {product.category}
              </span>
              <span className="text-sm text-bronze">
                Version {product.version}
              </span>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gold-light mb-4">
                {product.name}
              </h1>

              <p className="text-sm text-bronze mb-4">
                Rating:{' '}
                <span className="text-gold font-semibold">
                  {product.rating.toFixed(1)}
                </span>{' '}
                ({product.reviews} reviews) • {product.downloads.toLocaleString()}{' '}
                downloads
              </p>

              <p className="text-base text-text leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="text-4xl font-bold text-gold drop-shadow-[0_0_25px_rgba(212,175,55,0.7)]">
                  ${product.price.toFixed(2)}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-gold to-bronze text-bg font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_5px_20px_rgba(212,175,55,0.6)]"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      // Add to cart and go directly to checkout
                      handleAddToCart().then(() => router.push('/checkout'));
                    }}
                    className="flex-1 px-6 py-3 bg-gold/10 border border-gold text-gold font-semibold rounded-lg transition-all duration-300 hover:bg-gold/20"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MiniCart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={handleRemoveFromCart}
        total={cartService.getCartTotal()}
      />
    </main>
  );
}


