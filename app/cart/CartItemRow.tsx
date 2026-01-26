"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { increase, decrease, remove } from "store-redux/cartSlice";
import type { AppDispatch } from "store-redux";
import type { CartItem } from "types/cart-item";

type CartItemRowProps = {
    item: CartItem;
};

const CartItemRow = React.memo(function CartItemRow({
    item,
}: CartItemRowProps) {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div className="
  flex flex-col sm:flex-row items-center gap-4
  border-b border-gray-300 dark:border-gray-700
  pb-4 last:border-b-0 last:pb-0
  transition-colors
">
            <div className="w-20 h-20 flex items-center justify-center">
                <img className="max-h-20 object-contain" src={item.image} alt={item.title} width={80} />
            </div>
            <div className="flex-1 w-full">
                <h3 className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-100">
                    {item.title}</h3>

                <p className="text-sm text-gray-600  dark:text-gray-300">
                    Price:{" "}
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                        ${item.price}
                    </span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Subtotal:{" "}
                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                        ${(item.price * item.qty).toFixed(2)}
                    </span>
                </p>

            </div>
            <div className="flex items-center gap-3" >
                <button className="
    w-8 h-8 flex items-center justify-center
    rounded-md border
    border-gray-300 dark:border-gray-700
    text-gray-700 dark:text-gray-200
    hover:bg-gray-100 dark:hover:bg-gray-700
    transition-colors
  "   onClick={() => dispatch(decrease(item.id))}>-</button>
                <span >Qty: {item.qty}</span>
                <button className="
    w-8 h-8 flex items-center justify-center
    rounded-md border
    border-gray-300 dark:border-gray-700
    text-gray-700 dark:text-gray-200
    hover:bg-gray-100 dark:hover:bg-gray-700
    transition-colors
  "  onClick={() => dispatch(increase(item.id))}>+</button>
                <button className="text-xs md:text-sm text-red-600 hover:text-red-700 font-semibold" onClick={() => dispatch(remove(item.id))}>
                    Remove
                </button>
            </div>
            <hr />

        </div>
    );
})
export default CartItemRow;