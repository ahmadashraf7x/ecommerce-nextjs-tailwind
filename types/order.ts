import { PaymentMethod, ShippingInfo } from "store-redux/checkoutSlice";
import { CartItem } from "./cart-item";


export type Order = {
  id: number;
  userEmail: string;
  items: CartItem [];
  totalPrice: number;
  shippingInfo: ShippingInfo;
  paymentMethod: PaymentMethod;
  createdAt: string;
};