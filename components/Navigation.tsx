'use client';

import { ShoppingCart } from 'lucide-react';

interface NavigationProps {
  cartCount: number;
  onCartToggle: () => void;
}

export default function Navigation({ cartCount, onCartToggle }: NavigationProps) {
  return (
    <nav className="fixed top-0 w-full px-6 md:px-12 py-5 flex justify-between items-center z-50 bg-black/95 backdrop-blur-md border-b border-gold/35">
      <div className="flex items-center gap-4">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADC0lEQVR4nO2ZS0hUURjHf+OYOqaOjqhpD8osX0VFURKVQYtaBEEQRS0CW7RoUYsWQbSIoihCWhRB0aJVRBFEUZRCZJH2fqiU9rBSKSt1Os7MbeE4zjjqnHvvuXMH5w8fw8x3vvP9OM+553yglFLKv1gEbAT2AUeAk8A54DpwF3gMvAXGgGlgBpgFfgJfgQ/Ac+Ae0AQcBrYBVUAJ8M9QABQDO4FTwB3gCzAn2XMc6ARqgVVAPrAEWAoUAutkP0eBO8BQgnN9BzqAQ0A5UAgE/kkDS4FtwHngEzAv8QH3gROy72Wiz+XACeAu8D7BZ38BzcAmIB+3USDtXwe6JbiDz3+W4JZLHyuBJmBa+voCXATqhQrHECvAaqAfeC39zwHdwC6gEM8QRm8WuCFJnFj5Q5L0a/FYAoEQ0ADckUqRjLPAJtyCSKId6JfKk4xTQBkuQ6QQcZmOPd+BfbgYEX6DrLw13pJ+IrhVAUQ1WuVwm0ghuoiq0i36DFSQBYQ1ukLG0BsykiygVo3I+m7jYJYgyrBBxlGHaV9ZRrGMo37TNbCOPUC7jKc2E76yDFGNdsuYajfpK4sQ1WjIFK+sIqxRuwlVWYeoRq0mVBUPEY3uG1eVI0Q0umZUVTmCSAW6Yoqq8hjiFdCkW1W5gHgFNGlVVa4gUgHN2lSVS4hXQLM2VbmEeIWYS6jKNcQr4I88pdVnLiFeAX/kKa0+cwnxCpgC/qJcQ7wrvklmlOxDVKMP867KBcQ7oMGrygUkqgOzaFW5gqgD5pq0qlxAvALMaPJf1AFNbmisynVEHfBnnxZVuYSoBebkqQqXEK8A/eyrylXEK0C/m6rKBSRaA21adWUb4hWgh2adurINUQfoJe2qsg3xCtDvWFVZh0Qr4K9WVdmGRAXMa1WVbYgPgE4dWlVlG6IO0EdaVGUbEvVCdaZeVbYhXgE6HdOqKtuQqAPOGFCVbUhUB+pMvapcQKI68ElvqqpcQNQCOu1VlQuIV8D/i1gHjGpSlSuId8D/TbwDXGIBWQqoVEoptX/lN/Lfy70U6sEuAAAAAElFTkSuQmCC"
          alt="RUNE Logo"
          className="w-12 h-12 rounded-full drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] transition-all duration-300"
        />
        <div>
          <div className="text-2xl font-bold bg-gradient-to-r from-gold-light to-gold bg-clip-text text-transparent animate-ember-glow">
            RUNE
          </div>
          <div className="text-xs text-bronze tracking-[2px] uppercase">
            by RuneForge
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <a href="#marketplace" className="text-text hover:text-gold transition-colors font-semibold hidden md:block">
          Marketplace
        </a>
        <button
          onClick={onCartToggle}
          className="relative transition-transform hover:scale-110"
        >
          <ShoppingCart className="w-6 h-6 text-text" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
