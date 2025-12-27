![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=fff)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![REST API](https://img.shields.io/badge/API-REST-green)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)

# 🛒 E-Store — Modern E-Commerce Frontend

A fully responsive e-commerce frontend built with **Next.js 16**, **React**, **TypeScript**, and **Tailwind CSS**.  
Fetches products from **FakeStoreAPI**, supports search, filtering, dynamic routing, full cart management, persistent storage using `localStorage`, and **global dark / light mode support**.

The project focuses on clean UI, scalable component structure, and understanding **Server vs Client rendering and hydration behavior** in Next.js.

---

## 🚀 Features

### 🛍️ Product Listing
- Fetch products from **FakeStoreAPI**
- Responsive product grid layout
- Search by product title
- Category filtering
- Modern clean UI using **Tailwind CSS**

### 📄 Product Details
- Dynamic routing using `/products/[id]`
- Product image, price, description & category
- Add to cart button
- Saved to cart inside localStorage

### 🛒 Shopping Cart
- View all cart items
- Increase / decrease item quantity
- Remove individual items
- Empty cart completely
- Auto-calculated **subtotal & total**
- Cart synced with Header using a custom `cart-updated` event
- Cart data stored in **localStorage**

### 🌗 Dark / Light Mode
- Global dark and light theme support
- User preference persisted using `localStorage`
- Smooth theme transitions using Tailwind CSS

### 🧭 Global Header (Layout)
- Shared across all pages (Next.js App Router)
- Live cart counter updates instantly
- Clean and reusable layout structure

---

## 🛠 Tech Stack
- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **LocalStorage API**
- **FakeStoreAPI**


## 🧠 Technical Decisions & Learnings

### 🔄 Server / Client Rendering & Hydration

While implementing dark mode, a hydration mismatch occurred due to theme-based styles inside the global layout.

To solve this:
- The interactive Header was extracted into a dedicated **client-side component**
- This avoided SSR hydration mismatches
- Allowed safe styling changes (colors, borders, hover states)
- Improved separation of concerns and overall architecture

This process helped me better understand:
- Server vs Client rendering in Next.js
- How React hydration works
- When to move logic to client-only components

### 🛒 Cart Logic Separation & State Management

To improve maintainability and avoid duplicated logic, cart-related behavior was extracted into a centralized utility module.

This includes:
- Adding items to cart
- Increasing / decreasing quantities
- Removing items
- Clearing the cart
- Synchronizing cart state with `localStorage`

Benefits of this approach:
- UI components remain focused on rendering and user interaction
- Cart business rules are defined in a single place
- Easier to scale or replace `localStorage` with an API in the future
- Cleaner and more readable page components

This refactor reflects real-world frontend architecture practices, even in a client-only application.

---

## 🗂 Project Structure

- `app/` — Pages, routing, and layouts
- `components/` — Reusable UI components (Header)
- `lib/` — Centralized cart logic and localStorage utilities
- `public/` — Static assets and screenshots

---

## 📸 Screenshots

### 🏠 Home Page  
![Home Page](./public/screenshots/home-light.png)

### 🌗 Home Page (Dark Mode)  
![Home Page Dark](./public/screenshots/home-dark.png)

### 📦 Product Details  
![Product Details](./public/screenshots/details.png)

### 🧺 Cart Page  
![Cart Page](./public/screenshots/cart.png)

### ❌ Empty Cart  
![Empty Cart](./public/screenshots/empty.png)

---

## ▶️ Run Locally

```bash
git clone https://github.com/ahmadashraf7x/ecommerce-nextjs-tailwind.git
cd ecommerce-nextjs-tailwind
npm install
npm run dev
```

## 🌍 Live Demo

🚀 https://ecommerce-nextjs-tailwind-ecru.vercel.app


---

### 📌 Author
**Ahmad Ashraf**

Front-End Developer