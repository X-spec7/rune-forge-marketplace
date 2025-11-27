'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const getStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    return { full: fullStars, empty: 5 - fullStars };
  };

  const stars = getStars(product.rating);

  return (
    <div className="bg-black/80 border border-gold/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-gold hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)] backdrop-blur-md">
      <span className="inline-block px-4 py-1 bg-gradient-to-r from-gold/20 to-bronze/20 border border-gold rounded-full text-xs uppercase tracking-wider text-gold mb-4">
        {product.category}
      </span>

      <img
        src={product.image}
        alt={product.name}
        className="w-20 h-20 mx-auto mb-5 drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]"
      />

      <h3 className="text-xl font-semibold text-gold-light mb-2">
        {product.name}
      </h3>

      <p className="text-sm text-bronze mb-4">
        Version {product.version}
      </p>

      <p className="text-sm text-text leading-relaxed mb-5 min-h-[60px]">
        {product.description}
      </p>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex text-gold">
          {[...Array(stars.full)].map((_, i) => (
            <Star key={`full-${i}`} className="w-4 h-4 fill-current" />
          ))}
          {[...Array(stars.empty)].map((_, i) => (
            <Star key={`empty-${i}`} className="w-4 h-4" />
          ))}
        </div>
        <span className="text-xs text-bronze">
          ({product.reviews} reviews)
        </span>
      </div>

      <div className="text-3xl font-bold text-gold mb-5 drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]">
        ${product.price.toFixed(2)}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onAddToCart(product)}
          className="flex-1 px-5 py-3 bg-gradient-to-r from-gold to-bronze text-bg font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_5px_20px_rgba(212,175,55,0.5)]"
        >
          Add to Cart
        </button>
        <Link
          href={`/products/${product.id}`}
          className="px-5 py-3 bg-gold/10 border border-gold text-gold font-semibold rounded-lg transition-all duration-300 hover:bg-gold/20 flex items-center justify-center"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
