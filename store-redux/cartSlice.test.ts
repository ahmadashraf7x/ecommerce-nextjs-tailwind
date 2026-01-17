import cartReducer, { addItem, clear, decrease, increase, remove } from "./cartSlice";

describe("cartSlice - addItem", () => {
  test("should add item to empty cart with qty = 1", () => {
    const initialState = { items: [] };

    const product = {
      id: 1,
      title: "Test Product",
      price: 100,
      image: "test.jpg",
    };

    const newState = cartReducer(initialState, addItem(product));

    expect(newState.items.length).toBe(1);
    expect(newState.items[0].id).toBe(1);
    expect(newState.items[0].qty).toBe(1);
  });
});

test("should increase qty if item already exists in cart", () => {
  const initialState = {
    items: [
      {
        id: 1,
        title: "Test Product",
        price: 100,
        image: "test.jpg",
        qty: 2,
      },
    ],
  };

  const product = {
    id: 1,
    title: "Test Product",
    price: 100,
    image: "test.jpg",
  };

  const newState = cartReducer(initialState, addItem(product));

  expect(newState.items.length).toBe(1);   // نفس المنتج
  expect(newState.items[0].qty).toBe(3);   // زود واحد
});

describe("cartSlice - increase", () => {
  test("should increase qty of existing item", () => {
    const initialState = {
      items: [
        {
          id: 1,
          title: "Test Product",
          price: 100,
          image: "test.jpg",
          qty: 2,
        },
      ],
    };

    const newState = cartReducer(initialState, increase(1));

    expect(newState.items[0].qty).toBe(3);
  });

  test("should do nothing if item does not exist", () => {
    const initialState = {
      items: [
        {
          id: 1,
          title: "Test Product",
          price: 100,
          image: "test.jpg",
          qty: 2,
        },
      ],
    };

    const newState = cartReducer(initialState, increase(2));


    expect(newState.items[0].qty).toBe(2);
    expect(newState.items[0].id).toBe(1);
    expect(newState.items[0].qty).toBe(2);
  });
});

describe("cartSlice - decrease", () => {
  test("should decrease qty if qty > 1", () => {
    const initialState = {
      items: [
        {
          id: 1,
          title: "Test Product",
          price: 100,
          image: "test.jpg",
          qty: 2,
        },
      ],
    };

    const newState = cartReducer(initialState, decrease(1));
    expect(newState.items[0].qty).toBe(1);
  });

  test("should remove item if qty = 1", () => {
    const initialState = {
      items: [
        {
          id: 1,
          title: "Test Product",
          price: 100,
          image: "test.jpg",
          qty: 1,
        },
      ],
    };

    const newState = cartReducer(initialState, decrease(1));
    expect(newState.items.length).toBe(0);
  });


  test("should do nothing if item does not exist", () => {
    const initialState = {
      items: [
        {
          id: 1,
          title: "Test Product",
          price: 100,
          image: "test.jpg",
          qty: 2,
        },
      ],
    };
    const newState = cartReducer(initialState, decrease(2));
    expect(newState.items[0].qty).toBe(2);
    expect(newState.items[0].id).toBe(1);
  });
});




describe("cartSlice - remove", () => {
  test("should remove item from cart", () => {
    const initialState = {
      items: [
        {
          id: 1,
          title: "Test Product",
          price: 100,
          image: "test.jpg",
          qty: 3,
        },
      ],
    };

    const newState = cartReducer(initialState, remove(1));
    expect(newState.items.length).toBe(0);
  });

  test("should do nothing if item does not exist", () => {
    const initialState = {
      items: [
        {
          id: 1,
          title: "Test Product",
          price: 100,
          image: "test.jpg",
          qty: 2,
        },
      ],
    };
    const newState = cartReducer(initialState, remove(2));
    expect(newState.items[0].qty).toBe(2);
    expect(newState.items[0].id).toBe(1);
  });
});

describe("cartSlice - clear", () => {
  test("should clear all items from cart", () => {
    const initialState = {
      items: [
        {
          id: 1,
          title: "Test Product",
          price: 100,
          image: "test.jpg",
          qty: 2,
        },
      ],
    };
    const newState = cartReducer(initialState, clear());

    expect(newState.items.length).toBe(0);
  });
  test("should handle clearing an already empty cart", () => {
    const initialState = {
      items: [],
    };
    const newState = cartReducer(initialState, clear());
    expect(newState.items.length).toBe(0);
  });
});