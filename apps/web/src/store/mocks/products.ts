import { Product, ProductCategory } from "@types";

export const PRODUCT_MOCKS: Product[] = [
  {
    id: 1,
    name: "Manzana Roja",
    category: ProductCategory.FRESH_FRUITS,
    stock: 50,
    price: 2000,
    tax: 0.19,
  },
  {
    id: 2,
    name: "Manzana Verde",
    category: ProductCategory.FRESH_FRUITS,
    stock: 30,
    price: 3000,
    tax: 0,
  },
  {
    id: 3,
    name: "Banano",
    category: ProductCategory.FRESH_FRUITS,
    stock: 100,
    price: 1000,
    tax: 0,
  },
  {
    id: 4,
    name: "Pera",
    category: ProductCategory.FRESH_FRUITS,
    stock: 25,
    price: 3000,
    tax: 0.19,
  },
  {
    id: 5,
    name: "Fresa",
    category: ProductCategory.FRESH_FRUITS,
    stock: 40,
    price: 4000,
    tax: 0.19,
  },
  {
    id: 6,
    name: "Uva Morada",
    category: ProductCategory.FRESH_FRUITS,
    stock: 6000,
    price: 5.0,
    tax: 0,
  },
  {
    id: 7,
    name: "Uva Verde",
    category: ProductCategory.FRESH_FRUITS,
    stock: 55,
    price: 5000,
    tax: 0.19,
  },
  {
    id: 8,
    name: "Naranja",
    category: ProductCategory.CITRUS,
    stock: 70,
    price: 2000,
    tax: 0,
  },
  {
    id: 9,
    name: "Limón",
    category: ProductCategory.CITRUS,
    stock: 90,
    price: 1000,
    tax: 0.19,
  },
  {
    id: 10,
    name: "Mandarina",
    category: ProductCategory.CITRUS,
    stock: 45,
    price: 3000,
    tax: 0,
  },
  {
    id: 11,
    name: "Piña",
    category: ProductCategory.TROPICAL,
    stock: 20,
    price: 7000,
    tax: 0.19,
  },
  {
    id: 12,
    name: "Mango",
    category: ProductCategory.TROPICAL,
    stock: 35,
    price: 3000,
    tax: 0,
  },
  {
    id: 13,
    name: "Papaya",
    category: ProductCategory.TROPICAL,
    stock: 30,
    price: 5000,
    tax: 0.19,
  },
  {
    id: 14,
    name: "Coco",
    category: ProductCategory.TROPICAL,
    stock: 15,
    price: 8000,
    tax: 0,
  },
  {
    id: 15,
    name: "Sandía",
    category: ProductCategory.TROPICAL,
    stock: 10,
    price: 9000,
    tax: 0.19,
  },
];

export const loadInitialProducts = (): Product[] => {
  const storedProducts = localStorage.getItem("initial-products");

  if (storedProducts) {
    return JSON.parse(storedProducts);
  }

  localStorage.setItem("initial-products", JSON.stringify(PRODUCT_MOCKS));
  return PRODUCT_MOCKS;
};
