import { create } from "zustand";
import { persist } from "zustand/middleware";


export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
};

type CartState = {
  items: CartItem[];

  addItem: (item: Omit<CartItem, "qty">) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const items = get().items;
        const existing = items.find(i => i.id === product.id);

        if (existing) {
          set({
            items: items.map(i =>
              i.id === product.id ? { ...i, qty: i.qty + 1 } : i
            ),
          });
        } else {
          set({
            items: [...items, { ...product, qty: 1 }],
          });
        }
      },

      increase: (id) => {
        const items = get().items;
        set({
          items: items.map(i =>
            i.id === id ? { ...i, qty: i.qty + 1 } : i
          ),
        });
      },

      decrease: (id) => {
        const items = get().items;
        set({
          items: items
            .map(i =>
              i.id === id ? { ...i, qty: i.qty - 1 } : i
            )
            .filter(i => i.qty > 0),
        });
      },

      remove: (id) => {
        const items = get().items;
        set({
          items: items.filter(i => i.id !== id),
        });
      },

      clear: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);
