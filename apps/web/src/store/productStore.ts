import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductStoreState } from "@store/types";
import { loadInitialProducts } from "@store/mocks";

export const useProductStore = create<ProductStoreState>()(
  persist(
    (set, get) => ({
      products: loadInitialProducts(),
      cart: [],

      initializeProducts: (initialProducts) => {
        set({ products: initialProducts });
      },
      addToCart: (product) => {
        const existingCartItem = get().cart.find(
          (item) => item.id === product.id
        );
        if (existingCartItem) {
          set((state) => ({
            cart: state.cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }));
        } else {
          set((state) => ({
            cart: [...state.cart, { ...product, quantity: 1 }],
          }));
        }
      },
      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        }));
      },
      updateCartItemQuantity: (productId, quantity) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        }));
      },
      clearCart: () => {
        set({ cart: [] });
      },
      decrementProductStock: (productId, quantity) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === productId
              ? { ...product, stock: Math.max(0, product.stock - quantity) }
              : product
          ),
        }));
      },
      calculateCartTotal: () => {
        return get().cart.reduce((total, item) => {
          const itemTotal = item.price * item.quantity * (1 + item.tax);
          return total + itemTotal;
        }, 0);
      },
    }),
    {
      name: "product-storage",
      partialize: (state) => ({
        cart: state.cart,
        products: state.products,
      }),
    }
  )
);

export const useCart = () => {
  const cart = useProductStore((state) => state.cart);
  const addToCart = useProductStore((state) => state.addToCart);
  const removeFromCart = useProductStore((state) => state.removeFromCart);
  const updateCartItemQuantity = useProductStore(
    (state) => state.updateCartItemQuantity
  );
  const clearCart = useProductStore((state) => state.clearCart);
  const calculateCartTotal = useProductStore(
    (state) => state.calculateCartTotal
  );

  return {
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    calculateCartTotal,
  };
};
