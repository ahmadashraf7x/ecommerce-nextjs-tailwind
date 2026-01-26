import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../types/cart-item";

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, "qty">>) => {
      const existing = state.items.find(i => i.id === action.payload.id);

      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }
    },

    increase: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.qty += 1;
    },

    decrease: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.qty > 1) {
        item.qty -= 1;
      } else {
        state.items = state.items.filter(i => i.id !== action.payload);
      }
    },

    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },

    clear: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, increase, decrease, remove, clear } = cartSlice.actions;

export default cartSlice.reducer;
