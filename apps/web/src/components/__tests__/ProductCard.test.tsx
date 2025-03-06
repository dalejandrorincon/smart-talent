import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProductCard } from "../ProductCard";
import { CartItem, ProductCategory } from "../../types";

const mockAddToCart = jest.fn();
const mockRemoveFromCart = jest.fn();
let mockCart: CartItem[] = [];

jest.mock("@store/productStore", () => ({
  useCart: () => ({
    cart: mockCart,
    addToCart: mockAddToCart,
    removeFromCart: mockRemoveFromCart,
  }),
}));

describe("ProductCard component", () => {
  const mockProduct = {
    id: 1,
    name: "Manzana Roja",
    price: 2000,
    stock: 50,
    category: ProductCategory.FRESH_FRUITS,
    tax: 0.19,
  };

  it("renders product information correctly", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Manzana Roja")).toBeInTheDocument();
    expect(screen.getByText("Precio: $2,000")).toBeInTheDocument();
    expect(screen.getByText("Stock: 50")).toBeInTheDocument();
  });

  it("calls addToCart when Add to Cart button is clicked", () => {
    render(<ProductCard product={mockProduct} />);

    const addButton = screen.getByRole("button", {
      name: /agregar al carrito/i,
    });
    fireEvent.click(addButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it("increments product quantity in cart when increase button is clicked", async () => {
    mockCart = [
      {
        id: 1,
        name: "Manzana Roja",
        price: 2000,
        quantity: 1,
        tax: 0.19,
        category: ProductCategory.FRESH_FRUITS,
        stock: 50,
      },
    ];

    render(<ProductCard product={mockProduct} />);

    const increaseButton = screen.getByRole("button", {
      name: /incrementar cantidad/i,
    });
    fireEvent.click(increaseButton);

    expect(mockAddToCart).toHaveBeenCalled();
  });
  it("decrements product quantity in cart when decrease button is clicked", async () => {
    mockCart = [
      {
        id: 1,
        name: "Manzana Roja",
        price: 2000,
        quantity: 5,
        tax: 0.19,
        category: ProductCategory.FRESH_FRUITS,
        stock: 50,
      },
    ];

    render(<ProductCard product={mockProduct} />);

    const decreaseButton = screen.getByRole("button", {
      name: /disminuir cantidad/i,
    });
    fireEvent.click(decreaseButton);

    expect(mockRemoveFromCart).toHaveBeenCalled();
  });

  it("disables Add to Cart button when stock is 0", () => {
    mockCart = [
      {
        id: 1,
        name: "Manzana Roja",
        price: 2000,
        quantity: 2,
        tax: 0.19,
        category: ProductCategory.FRESH_FRUITS,
        stock: 2,
      },
    ];

    const productWithNoStock = { ...mockProduct, stock: 0 };

    render(<ProductCard product={productWithNoStock} />);

    const addButton = screen.getByRole("button", {
      name: /agregar al carrito/i,
    });
    expect(addButton).toBeDisabled();
  });
});
