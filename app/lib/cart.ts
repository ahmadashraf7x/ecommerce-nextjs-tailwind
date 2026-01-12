export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
};

export function getCart(): CartItem[] {
  const stored = localStorage.getItem("cart");
  return stored ? JSON.parse(stored) : [];
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
}

export function addToCart(product: {
  id: number;
  title: string;
  price: number;
  image: string;
}) {
  const cart = getCart();

  const existing = cart.find(item => item.id === product.id);

  const newCart = existing
    ? cart.map(item =>
      item.id === product.id
        ? { ...item, qty: item.qty + 1 }
        : item
    )
    : [...cart, { ...product, qty: 1 }];

  saveCart(newCart);
  return newCart;
}

export function clearCart() {
  localStorage.removeItem("cart");
  window.dispatchEvent(new Event("cart-updated"));
  return [];
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}