'use client';

import { useState, useEffect } from 'react';
import { ProductService } from '@/services/ProductService';
import { CartService } from '@/services/CartService';
import { Product, FilterType, SortType, CartItem } from '@/types';
import ProductGrid from '@/components/ProductGrid';
import FilterBar from '@/components/FilterBar';
import SortDropdown from '@/components/SortDropdown';
import MiniCart from '@/components/MiniCart';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('newest');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const productService = ProductService.getInstance();
  const cartService = CartService.getInstance();

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [filter, sort]);

  const loadProducts = async () => {
    setLoading(true);
    const data = await productService.getProductsByCategory(filter);
    const sorted = productService.sortProducts(data, sort);
    setProducts(sorted);
    setLoading(false);
  };

  const loadCart = () => {
    setCartItems(cartService.getCart());
  };

  const handleAddToCart = async (product: Product) => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    };

    const success = await cartService.addToCart(cartItem);
    if (success) {
      loadCart();
      setIsCartOpen(true);
      setTimeout(() => setIsCartOpen(false), 3000);
    } else {
      alert('This item is already in your cart!');
    }
  };

  const handleRemoveFromCart = async (productId: string) => {
    await cartService.removeFromCart(productId);
    loadCart();
  };

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  const handleSortChange = (newSort: SortType) => {
    setSort(newSort);
  };

  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />

      <Navigation
        cartCount={cartItems.length}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
      />

      <section className="relative z-10 pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 text-gold-light animate-ember-glow">
            RUNE Marketplace
          </h2>
          <p className="text-xl text-center text-bronze mb-12">
            Enhance your sovereignty with premium models, plugins, and tools
          </p>

          <FilterBar currentFilter={filter} onFilterChange={handleFilterChange} />

          <SortDropdown currentSort={sort} onSortChange={handleSortChange} />

          {loading ? (
            <div className="text-center py-20 text-gold">
              Loading products...
            </div>
          ) : (
            <ProductGrid products={products} onAddToCart={handleAddToCart} />
          )}
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
