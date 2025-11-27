'use client';

import Link from 'next/link';
import { CartItem } from '@/types';
import { X } from 'lucide-react';

interface MiniCartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveItem: (productId: string) => void;
  total: number;
}

export default function MiniCart({ items, isOpen, onClose, onRemoveItem, total }: MiniCartProps) {
  return (
    <div
      className={`fixed top-20 w-96 max-h-[80vh] bg-black/98 border-2 border-gold rounded-2xl z-[9999] transition-all duration-300 backdrop-blur-xl flex flex-col ${
        isOpen ? 'right-5' : '-right-[400px]'
      }`}
    >
      <div className="flex justify-between items-center p-5 border-b border-gold/30">
        <h3 className="text-xl font-semibold text-gold">Your Cart</h3>
        <button
          onClick={onClose}
          className="text-gold hover:text-gold-light transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {items.length === 0 ? (
          <p className="text-center text-bronze py-10">Your cart is empty</p>
        ) : (
          items.map(item => (
            <div
              key={item.id}
              className="flex gap-4 mb-5 pb-5 border-b border-gold/20 last:border-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]"
              />
              <div className="flex-1">
                <div className="text-gold-light font-semibold mb-1">
                  {item.name}
                </div>
                <div className="text-gold font-bold">
                  ${item.price.toFixed(2)}
                </div>
              </div>
              <button
                onClick={() => onRemoveItem(item.id)}
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="p-5 border-t border-gold/30">
        <div className="flex justify-between items-center mb-5 text-lg font-bold text-gold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <Link
          href="/checkout"
          className="w-full px-6 py-3 bg-gradient-to-r from-gold to-bronze text-bg font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_5px_20px_rgba(212,175,55,0.5)] flex items-center justify-center"
          onClick={onClose}
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
