import { Product, FilterType, SortType } from '@/types';

export class ProductService {
  private static instance: ProductService;

  private constructor() {}

  static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  async getAllProducts(): Promise<Product[]> {
    await this.simulateDelay();
    return this.getMockProducts();
  }

  async getProductById(id: string): Promise<Product | null> {
    await this.simulateDelay();
    const products = this.getMockProducts();
    return products.find(p => p.id === id) || null;
  }

  async getProductsByCategory(category: FilterType): Promise<Product[]> {
    await this.simulateDelay();
    const products = this.getMockProducts();
    if (category === 'all') return products;
    return products.filter(p => p.category === category);
  }

  sortProducts(products: Product[], sortType: SortType): Product[] {
    const sorted = [...products];
    switch (sortType) {
      case 'popular':
        return sorted.sort((a, b) => b.downloads - a.downloads);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
      default:
        return sorted;
    }
  }

  private simulateDelay(ms: number = 300): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private getMockProducts(): Product[] {
    return [
      {
        id: 'rune-micro-1',
        name: 'Rune Micro Model 1.0',
        price: 19.99,
        category: 'models',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADC0lEQVR4nO2ZS0hUURjHf+OYOqaOjqhpD8osX0VFURKVQYtaBEEQRS0CW7RoUYsWQbSIoihCWhRB0aJVRBFEUZRCZJH2fqiU9rBSKSt1Os7MbeE4zjjqnHvvuXMH5w8fw8x3vvP9OM+553yglFLKv1gEbAT2AUeAk8A54DpwF3gMvAXGgGlgBpgFfgJfgQ/Ac+Ae0AQcBrYBVUAJ8M9QABQDO4FTwB3gCzAn2XMc6ARqgVVAPrAEWAoUAutkP0eBO8BQgnN9BzqAQ0A5UAgE/kkDS4FtwHngEzAv8QH3gROy72Wiz+XACeAu8D7BZ38BzcAmIB+3USDtXwe6JbiDz3+W4JZLHyuBJmBa+voCXATqhQrHECvAaqAfeC39zwHdwC6gEM8QRm8WuCFJnFj5Q5L0a/FYAoEQ0ADckUqRjLPAJtyCSKId6JfKk4xTQBkuQ6QQcZmOPd+BfbgYEX6DrLw13pJ+IrhVAUQ1WuVwm0ghuoiq0i36DFSQBYQ1ukLG0BsykiygVo3I+m7jYJYgyrBBxlGHaV9ZRrGMo37TNbCOPUC7jKc2E76yDFGNdsuYajfpK4sQ1WjIFK+sIqxRuwlVWYeoRq0mVBUPEY3uG1eVI0Q0umZUVTmCSAW6Yoqq8hjiFdCkW1W5gHgFNGlVVa4gUgHN2lSVS4hXQLM2VbmEeIWYS6jKNcQr4I88pdVnLiFeAX/kKa0+cwnxCpgC/qJcQ7wrvklmlOxDVKMP867KBcQ7oMGrygUkqgOzaFW5gqgD5pq0qlxAvALMaPJf1AFNbmisynVEHfBnnxZVuYSoBebkqQqXEK8A/eyrylXEK0C/m6rKBSRaA21adWUb4hWgh2adurINUQfoJe2qsg3xCtDvWFVZh0Qr4K9WVdmGRAXMa1WVbYgPgE4dWlVlG6IO0EdaVGUbEvVCdaZeVbYhXgE6HdOqKtuQqAPOGFCVbUhUB+pMvapcQKI68ElvqqpcQNQCOu1VlQuIV8D/i1gHjGpSlSuId8D/TbwDXGIBWQqoVEoptX/lN/Lfy70U6sEuAAAAAElFTkSuQmCC',
        version: '1.0',
        description: 'Compact yet powerful AI model optimized for low-resource environments.',
        rating: 4.8,
        reviews: 127,
        downloads: 3420
      },
      {
        id: 'rune-sovereign-2',
        name: 'Rune Sovereign Model 2.0',
        price: 49.99,
        category: 'models',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADC0lEQVR4nO2ZS0hUURjHf+OYOqaOjqhpD8osX0VFURKVQYtaBEEQRS0CW7RoUYsWQbSIoihCWhRB0aJVRBFEUZRCZJH2fqiU9rBSKSt1Os7MbeE4zjjqnHvvuXMH5w8fw8x3vvP9OM+553yglFLKv1gEbAT2AUeAk8A54DpwF3gMvAXGgGlgBpgFfgJfgQ/Ac+Ae0AQcBrYBVUAJ8M9QABQDO4FTwB3gCzAn2XMc6ARqgVVAPrAEWAoUAutkP0eBO8BQgnN9BzqAQ0A5UAgE/kkDS4FtwHngEzAv8QH3gROy72Wiz+XACeAu8D7BZ38BzcAmIB+3USDtXwe6JbiDz3+W4JZLHyuBJmBa+voCXATqhQrHECvAaqAfeC39zwHdwC6gEM8QRm8WuCFJnFj5Q5L0a/FYAoEQ0ADckUqRjLPAJtyCSKId6JfKk4xTQBkuQ6QQcZmOPd+BfbgYEX6DrLw13pJ+IrhVAUQ1WuVwm0ghuoiq0i36DFSQBYQ1ukLG0BsykiygVo3I+m7jYJYgyrBBxlGHaV9ZRrGMo37TNbCOPUC7jKc2E76yDFGNdsuYajfpK4sQ1WjIFK+sIqxRuwlVWYeoRq0mVBUPEY3uG1eVI0Q0umZUVTmCSAW6Yoqq8hjiFdCkW1W5gHgFNGlVVa4gUgHN2lSVS4hXQLM2VbmEeIWYS6jKNcQr4I88pdVnLiFeAX/kKa0+cwnxCpgC/qJcQ7wrvklmlOxDVKMP867KBcQ7oMGrygUkqgOzaFW5gqgD5pq0qlxAvALMaPJf1AFNbmisynVEHfBnnxZVuYSoBebkqQqXEK8A/eyrylXEK0C/m6rKBSRaA21adWUb4hWgh2adurINUQfoJe2qsg3xCtDvWFVZh0Qr4K9WVdmGRAXMa1WVbYgPgE4dWlVlG6IO0EdaVGUbEvVCdaZeVbYhXgE6HdOqKtuQqAPOGFCVbUhUB+pMvapcQKI68ElvqqpcQNQCOu1VlQuIV8D/i1gHjGpSlSuId8D/TbwDXGIBWQqoVEoptX/lN/Lfy70U6sEuAAAAAElFTkSuQmCC',
        version: '2.0',
        description: 'The flagship model for maximum sovereignty. Advanced reasoning and performance.',
        rating: 4.9,
        reviews: 89,
        downloads: 1547
      },
      {
        id: 'context-expander',
        name: 'Context Expander Plugin',
        price: 14.99,
        category: 'plugins',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADC0lEQVR4nO2ZS0hUURjHf+OYOqaOjqhpD8osX0VFURKVQYtaBEEQRS0CW7RoUYsWQbSIoihCWhRB0aJVRBFEUZRCZJH2fqiU9rBSKSt1Os7MbeE4zjjqnHvvuXMH5w8fw8x3vvP9OM+553yglFLKv1gEbAT2AUeAk8A54DpwF3gMvAXGgGlgBpgFfgJfgQ/Ac+Ae0AQcBrYBVUAJ8M9QABQDO4FTwB3gCzAn2XMc6ARqgVVAPrAEWAoUAutkP0eBO8BQgnN9BzqAQ0A5UAgE/kkDS4FtwHngEzAv8QH3gROy72Wiz+XACeAu8D7BZ38BzcAmIB+3USDtXwe6JbiDz3+W4JZLHyuBJmBa+voCXATqhQrHECvAaqAfeC39zwHdwC6gEM8QRm8WuCFJnFj5Q5L0a/FYAoEQ0ADckUqRjLPAJtyCSKId6JfKk4xTQBkuQ6QQcZmOPd+BfbgYEX6DrLw13pJ+IrhVAUQ1WuVwm0ghuoiq0i36DFSQBYQ1ukLG0BsykiygVo3I+m7jYJYgyrBBxlGHaV9ZRrGMo37TNbCOPUC7jKc2E76yDFGNdsuYajfpK4sQ1WjIFK+sIqxRuwlVWYeoRq0mVBUPEY3uG1eVI0Q0umZUVTmCSAW6Yoqq8hjiFdCkW1W5gHgFNGlVVa4gUgHN2lSVS4hXQLM2VbmEeIWYS6jKNcQr4I88pdVnLiFeAX/kKa0+cwnxCpgC/qJcQ7wrvklmlOxDVKMP867KBcQ7oMGrygUkqgOzaFW5gqgD5pq0qlxAvALMaPJf1AFNbmisynVEHfBnnxZVuYSoBebkqQqXEK8A/eyrylXEK0C/m6rKBSRaA21adWUb4hWgh2adurINUQfoJe2qsg3xCtDvWFVZh0Qr4K9WVdmGRAXMa1WVbYgPgE4dWlVlG6IO0EdaVGUbEvVCdaZeVbYhXgE6HdOqKtuQqAPOGFCVbUhUB+pMvapcQKI68ElvqqpcQNQCOu1VlQuIV8D/i1gHjGpSlSuId8D/TbwDXGIBWQqoVEoptX/lN/Lfy70U6sEuAAAAAElFTkSuQmCC',
        version: '1.2',
        description: 'Dramatically increase RUNE\'s context awareness and memory capabilities.',
        rating: 4.7,
        reviews: 234,
        downloads: 5621
      },
      {
        id: 'code-forge',
        name: 'CodeForge Developer Suite',
        price: 29.99,
        category: 'tools',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADC0lEQVR4nO2ZS0hUURjHf+OYOqaOjqhpD8osX0VFURKVQYtaBEEQRS0CW7RoUYsWQbSIoihCWhRB0aJVRBFEUZRCZJH2fqiU9rBSKSt1Os7MbeE4zjjqnHvvuXMH5w8fw8x3vvP9OM+553yglFLKv1gEbAT2AUeAk8A54DpwF3gMvAXGgGlgBpgFfgJfgQ/Ac+Ae0AQcBrYBVUAJ8M9QABQDO4FTwB3gCzAn2XMc6ARqgVVAPrAEWAoUAutkP0eBO8BQgnN9BzqAQ0A5UAgE/kkDS4FtwHngEzAv8QH3gROy72Wiz+XACeAu8D7BZ38BzcAmIB+3USDtXwe6JbiDz3+W4JZLHyuBJmBa+voCXATqhQrHECvAaqAfeC39zwHdwC6gEM8QRm8WuCFJnFj5Q5L0a/FYAoEQ0ADckUqRjLPAJtyCSKId6JfKk4xTQBkuQ6QQcZmOPd+BfbgYEX6DrLw13pJ+IrhVAUQ1WuVwm0ghuoiq0i36DFSQBYQ1ukLG0BsykiygVo3I+m7jYJYgyrBBxlGHaV9ZRrGMo37TNbCOPUC7jKc2E76yDFGNdsuYajfpK4sQ1WjIFK+sIqxRuwlVWYeoRq0mVBUPEY3uG1eVI0Q0umZUVTmCSAW6Yoqq8hjiFdCkW1W5gHgFNGlVVa4gUgHN2lSVS4hXQLM2VbmEeIWYS6jKNcQr4I88pdVnLiFeAX/kKa0+cwnxCpgC/qJcQ7wrvklmlOxDVKMP867KBcQ7oMGrygUkqgOzaFW5gqgD5pq0qlxAvALMaPJf1AFNbmisynVEHfBnnxZVuYSoBebkqQqXEK8A/eyrylXEK0C/m6rKBSRaA21adWUb4hWgh2adurINUQfoJe2qsg3xCtDvWFVZh0Qr4K9WVdmGRAXMa1WVbYgPgE4dWlVlG6IO0EdaVGUbEvVCdaZeVbYhXgE6HdOqKtuQqAPOGFCVbUhUB+pMvapcQKI68ElvqqpcQNQCOu1VlQuIV8D/i1gHjGpSlSuId8D/TbwDXGIBWQqoVEoptX/lN/Lfy70U6sEuAAAAAElFTkSuQmCC',
        version: '2.1',
        description: 'Professional development toolkit for RUNE with advanced code analysis.',
        rating: 4.9,
        reviews: 156,
        downloads: 2834
      },
      {
        id: 'privacy-shield',
        name: 'Privacy Shield Pro',
        price: 24.99,
        category: 'plugins',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADC0lEQVR4nO2ZS0hUURjHf+OYOqaOjqhpD8osX0VFURKVQYtaBEEQRS0CW7RoUYsWQbSIoihCWhRB0aJVRBFEUZRCZJH2fqiU9rBSKSt1Os7MbeE4zjjqnHvvuXMH5w8fw8x3vvP9OM+553yglFLKv1gEbAT2AUeAk8A54DpwF3gMvAXGgGlgBpgFfgJfgQ/Ac+Ae0AQcBrYBVUAJ8M9QABQDO4FTwB3gCzAn2XMc6ARqgVVAPrAEWAoUAutkP0eBO8BQgnN9BzqAQ0A5UAgE/kkDS4FtwHngEzAv8QH3gROy72Wiz+XACeAu8D7BZ38BzcAmIB+3USDtXwe6JbiDz3+W4JZLHyuBJmBa+voCXATqhQrHECvAaqAfeC39zwHdwC6gEM8QRm8WuCFJnFj5Q5L0a/FYAoEQ0ADckUqRjLPAJtyCSKId6JfKk4xTQBkuQ6QQcZmOPd+BfbgYEX6DrLw13pJ+IrhVAUQ1WuVwm0ghuoiq0i36DFSQBYQ1ukLG0BsykiygVo3I+m7jYJYgyrBBxlGHaV9ZRrGMo37TNbCOPUC7jKc2E76yDFGNdsuYajfpK4sQ1WjIFK+sIqxRuwlVWYeoRq0mVBUPEY3uG1eVI0Q0umZUVTmCSAW6Yoqq8hjiFdCkW1W5gHgFNGlVVa4gUgHN2lSVS4hXQLM2VbmEeIWYS6jKNcQr4I88pdVnLiFeAX/kKa0+cwnxCpgC/qJcQ7wrvklmlOxDVKMP867KBcQ7oMGrygUkqgOzaFW5gqgD5pq0qlxAvALMaPJf1AFNbmisynVEHfBnnxZVuYSoBebkqQqXEK8A/eyrylXEK0C/m6rKBSRaA21adWUb4hWgh2adurINUQfoJe2qsg3xCtDvWFVZh0Qr4K9WVdmGRAXMa1WVbYgPgE4dWlVlG6IO0EdaVGUbEvVCdaZeVbYhXgE6HdOqKtuQqAPOGFCVbUhUB+pMvapcQKI68ElvqqpcQNQCOu1VlQuIV8D/i1gHjGpSlSuId8D/TbwDXGIBWQqoVEoptX/lN/Lfy70U6sEuAAAAAElFTkSuQmCC',
        version: '1.0',
        description: 'Military-grade privacy hardening for maximum operational security.',
        rating: 5.0,
        reviews: 67,
        downloads: 1893
      },
      {
        id: 'voice-interface',
        name: 'Voice Interface Module',
        price: 34.99,
        category: 'plugins',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADC0lEQVR4nO2ZS0hUURjHf+OYOqaOjqhpD8osX0VFURKVQYtaBEEQRS0CW7RoUYsWQbSIoihCWhRB0aJVRBFEUZRCZJH2fqiU9rBSKSt1Os7MbeE4zjjqnHvvuXMH5w8fw8x3vvP9OM+553yglFLKv1gEbAT2AUeAk8A54DpwF3gMvAXGgGlgBpgFfgJfgQ/Ac+Ae0AQcBrYBVUAJ8M9QABQDO4FTwB3gCzAn2XMc6ARqgVVAPrAEWAoUAutkP0eBO8BQgnN9BzqAQ0A5UAgE/kkDS4FtwHngEzAv8QH3gROy72Wiz+XACeAu8D7BZ38BzcAmIB+3USDtXwe6JbiDz3+W4JZLHyuBJmBa+voCXATqhQrHECvAaqAfeC39zwHdwC6gEM8QRm8WuCFJnFj5Q5L0a/FYAoEQ0ADckUqRjLPAJtyCSKId6JfKk4xTQBkuQ6QQcZmOPd+BfbgYEX6DrLw13pJ+IrhVAUQ1WuVwm0ghuoiq0i36DFSQBYQ1ukLG0BsykiygVo3I+m7jYJYgyrBBxlGHaV9ZRrGMo37TNbCOPUC7jKc2E76yDFGNdsuYajfpK4sQ1WjIFK+sIqxRuwlVWYeoRq0mVBUPEY3uG1eVI0Q0umZUVTmCSAW6Yoqq8hjiFdCkW1W5gHgFNGlVVa4gUgHN2lSVS4hXQLM2VbmEeIWYS6jKNcQr4I88pdVnLiFeAX/kKa0+cwnxCpgC/qJcQ7wrvklmlOxDVKMP867KBcQ7oMGrygUkqgOzaFW5gqgD5pq0qlxAvALMaPJf1AFNbmisynVEHfBnnxZVuYSoBebkqQqXEK8A/eyrylXEK0C/m6rKBSRaA21adWUb4hWgh2adurINUQfoJe2qsg3xCtDvWFVZh0Qr4K9WVdmGRAXMa1WVbYgPgE4dWlVlG6IO0EdaVGUbEvVCdaZeVbYhXgE6HdOqKtuQqAPOGFCVbUhUB+pMvapcQKI68ElvqqpcQNQCOu1VlQuIV8D/i1gHjGpSlSuId8D/TbwDXGIBWQqoVEoptX/lN/Lfy70U6sEuAAAAAElFTkSuQmCC',
        version: '1.3',
        description: 'Hands-free RUNE interaction with 99% accuracy offline voice processing.',
        rating: 4.6,
        reviews: 178,
        downloads: 3456
      }
    ];
  }
}
