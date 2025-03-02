import { CartItem } from "@store/types/";

export interface ShippingInfo {
  name: string;
  email: string;
  phone: string;
  country: string;
}

export interface Invoice {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  shippingInfo: ShippingInfo;
}
