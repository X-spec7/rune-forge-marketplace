# RUNE Marketplace - Mock Services Documentation

This document describes the mock service classes that simulate backend functionality. These services use in-memory data and localStorage, and can be easily replaced with real API calls later.

## Service Architecture

### ProductService

**Location:** `services/ProductService.ts`

**Purpose:** Manages product data retrieval and filtering

**Methods:**

- `getInstance()` - Returns singleton instance
- `getAllProducts()` - Fetches all products (simulated delay: 300ms)
- `getProductById(id: string)` - Fetches a single product by ID
- `getProductsByCategory(category: FilterType)` - Filters products by category
- `sortProducts(products: Product[], sortType: SortType)` - Sorts product array

**Mock Data:**
- 6 pre-configured products (2 models, 3 plugins, 1 tool)
- Each product includes: id, name, price, category, image, version, description, rating, reviews, downloads

**To Replace with Real API:**
```typescript
async getAllProducts(): Promise<Product[]> {
  const response = await fetch('/api/products');
  return response.json();
}

async getProductById(id: string): Promise<Product | null> {
  const response = await fetch(`/api/products/${id}`);
  return response.json();
}
```

### CartService

**Location:** `services/CartService.ts`

**Purpose:** Manages shopping cart operations

**Methods:**

- `getInstance()` - Returns singleton instance
- `addToCart(item: CartItem)` - Adds item to cart (returns false if already exists)
- `removeFromCart(productId: string)` - Removes item from cart
- `getCart()` - Returns current cart items
- `clearCart()` - Empties the cart
- `getCartTotal()` - Calculates total price
- `getCartCount()` - Returns number of items

**Storage:**
- Uses localStorage with key `runeCart`
- Data persists across browser sessions

**To Replace with Real API:**
```typescript
async addToCart(item: CartItem): Promise<boolean> {
  const response = await fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return response.ok;
}

async getCart(): Promise<CartItem[]> {
  const response = await fetch('/api/cart');
  return response.json();
}
```

## Component Structure

### Page Components

- `app/page.tsx` - Main marketplace page with state management
- Handles product loading, filtering, sorting, and cart operations

### UI Components

- `Navigation.tsx` - Top navigation with cart icon and badge
- `AnimatedBackground.tsx` - Canvas-based particle animation
- `FilterBar.tsx` - Category filter buttons
- `SortDropdown.tsx` - Product sorting dropdown
- `ProductGrid.tsx` - Grid container for product cards
- `ProductCard.tsx` - Individual product display card
- `MiniCart.tsx` - Sliding cart panel

## Type Definitions

**Location:** `types/index.ts`

Key types:
- `Product` - Product data structure
- `CartItem` - Simplified cart item structure
- `FilterType` - 'all' | 'models' | 'plugins' | 'tools'
- `SortType` - 'newest' | 'popular' | 'rating' | 'price-low' | 'price-high'

## Features Implemented

1. **Product Catalog**
   - Display all products in a responsive grid
   - Filter by category (All, Models, Plugins, Tools)
   - Sort by multiple criteria

2. **Shopping Cart**
   - Add/remove items
   - Persistent storage (localStorage)
   - Real-time cart count badge
   - Auto-opening mini cart on add
   - Total price calculation

3. **Visual Design**
   - Dark theme with gold/bronze accents
   - Animated particle background
   - Ember glow text animation
   - Smooth transitions and hover effects
   - Fully responsive layout

## Future API Integration

To integrate with a real backend:

1. Replace service methods with actual API calls
2. Add authentication tokens to requests
3. Implement error handling and loading states
4. Add data validation and sanitization
5. Consider using React Query or SWR for data fetching

Example API structure:
```
GET    /api/products          - List all products
GET    /api/products/:id      - Get single product
GET    /api/products/category/:category - Filter by category
POST   /api/cart              - Add to cart
GET    /api/cart              - Get cart items
DELETE /api/cart/:id          - Remove from cart
POST   /api/checkout          - Process checkout
```

## Running the Application

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see the marketplace.

## Building for Production

```bash
npm run build
npm start
```

The application is configured for static export and can be deployed to any static hosting service.
