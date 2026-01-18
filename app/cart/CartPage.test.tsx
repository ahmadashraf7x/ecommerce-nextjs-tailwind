import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../store-redux/cartSlice";
import CartPage from "./page";
import userEvent from "@testing-library/user-event";

function renderWithStore(preloadedState: any) {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    } as any ,
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <CartPage />
    </Provider>
  );
}

describe("CartPage", () => {
  test("shows empty cart message when cart is empty", async () => {
    renderWithStore({
      cart: {
        items: [],
      },
    });

    const emptyMessage = await screen.findByText(/cart is empty/i);

    expect(emptyMessage).toBeInTheDocument();
  });
});

test("shows cart items when cart has products", async () => {
  const product = {
    id: 1,
    title: "Test Product",
    price: 100,
    image: "test.jpg",
    qty: 2,
  };

  renderWithStore({
    cart: {
      items: [product],
    },
  });

  const itemTitle = await screen.findByText("Test Product");

  expect(itemTitle).toBeInTheDocument();
});

test("increases item quantity when clicking + button", async () => {
  const product = {
    id: 1,
    title: "Test Product",
    price: 100,
    image: "test.jpg",
    qty: 1,
  };

  renderWithStore({
    cart: {
      items: [product],
    },
  });

  expect(screen.getByText(/qty:\s*1/i)).toBeInTheDocument();

  const plusButton = screen.getByText("+");

  const user = userEvent.setup();
  await user.click(plusButton);

  expect(await screen.findByText(/qty:\s*2/i)).toBeInTheDocument();
});

test("decreases item quantity when clicking - button", async () => {
  const product = {
    id: 1,
    title: "Test Product",
    price: 100,
    image: "test.jpg",
    qty: 2,
  };

  renderWithStore({
    cart: {
      items: [product],
    },
  });

  expect(screen.getByText(/qty:\s*2/i)).toBeInTheDocument();

  const minusButton = screen.getByText("-");

  const user = userEvent.setup();
  await user.click(minusButton);

  expect(await screen.findByText(/qty:\s*1/i)).toBeInTheDocument();
});

test("removes item when clicking - and quantity is 1", async () => {
  const product = {
    id: 1,
    title: "Test Product",
    price: 100,
    image: "test.jpg",
    qty: 1,
  };

  renderWithStore({
    cart: {
      items: [product],
    },
  });

  expect(screen.getByText("Test Product")).toBeInTheDocument();

  const minusButton = screen.getByText("-");

  const user = userEvent.setup();
  await user.click(minusButton);

  expect(await screen.findByText(/cart is empty/i)).toBeInTheDocument();

  expect(screen.queryByText("Test Product")).toBeNull();
});

test("removes item when clicking Remove button", async () => {
  const product = {
    id: 1,
    title: "Test Product",
    price: 100,
    image: "test.jpg",
    qty: 2,
  };

  renderWithStore({
    cart: {
      items: [product],
    },
  });

  expect(screen.getByText("Test Product")).toBeInTheDocument();

  const removeButton = screen.getByText(/remove/i);

  const user = userEvent.setup();
  await user.click(removeButton);

  expect(await screen.findByText(/cart is empty/i)).toBeInTheDocument();
  expect(screen.queryByText("Test Product")).toBeNull();
});

test("clears cart when clicking Empty cart button", async () => {
  const product = {
    id: 1,
    title: "Test Product",
    price: 100,
    image: "test.jpg",
    qty: 2,
  };

  renderWithStore({
    cart: {
      items: [product],
    },
  });

  expect(screen.getByText("Test Product")).toBeInTheDocument();

  const emptyCartButton = screen.getByText(/empty cart/i);

  const user = userEvent.setup();
  await user.click(emptyCartButton);

  expect(await screen.findByText(/cart is empty/i)).toBeInTheDocument();
  expect(screen.queryByText("Test Product")).toBeNull();
});
