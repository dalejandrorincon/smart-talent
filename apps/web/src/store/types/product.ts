import { ShippingInfo, Invoice } from "@store/types";
export enum ProductCategory {
  FRESH_FRUITS = "Frutas Frescas",
  CITRUS = "Cítricos",
  TROPICAL = "Tropicales",
}

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  stock: number;
  price: number;
  tax: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ProductStoreState {
  products: Product[];
  cart: CartItem[];
  invoices: Invoice[];
  initializeProducts: (initialProducts: Product[]) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  decrementProductStock: (productId: number, quantity: number) => void;
  calculateCartTotal: () => number;
  generateInvoice?: (shippingInfo: ShippingInfo) => Invoice;
}
