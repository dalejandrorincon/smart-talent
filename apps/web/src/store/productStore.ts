import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Invoice, ProductStoreState } from "@types";
import { loadInitialProducts } from "@store/mocks";
import { v4 as uuidv4 } from "uuid";

export const useProductStore = create<ProductStoreState>()(
  persist(
    (set, get) => ({
      products: loadInitialProducts(),
      cart: [],
      invoices: [],

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
      generateInvoice: (shippingInfo) => {
        const cart = get().cart;

        const subtotal = cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        const tax = cart.reduce(
          (total, item) => total + item.price * item.quantity * item.tax,
          0
        );
        const total = subtotal + tax;

        const invoice: Invoice = {
          id: uuidv4(),
          date: new Date().toISOString(),
          items: cart,
          subtotal,
          tax,
          total,
          shippingInfo,
        };

        set((state) => ({
          invoices: [...state.invoices, invoice],

          products: state.products.map((product) => {
            const cartItem = cart.find((item) => item.id === product.id);
            return cartItem
              ? {
                  ...product,
                  stock: Math.max(0, product.stock - cartItem.quantity),
                }
              : product;
          }),
          cart: [],
        }));

        return invoice;
      },
    }),
    {
      name: "product-storage",
      partialize: (state) => ({
        cart: state.cart,
        products: state.products,
        invoices: state.invoices,
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

export const useInvoices = () => {
  const invoices = useProductStore((state) => state.invoices);
  const generateInvoice = useProductStore((state) => state.generateInvoice);

  return {
    invoices,
    generateInvoice,
  };
};
