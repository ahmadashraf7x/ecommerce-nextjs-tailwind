"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "store-redux";
import {
  setPaymentMethod,
  setCardData,
  setBankData,
} from "store-redux/checkoutSlice";

const onlyNumbers = (value: string) => value.replace(/\D/g, "");

const alphaNumericOnly = (value: string) =>
  value.replace(/[^a-zA-Z0-9 ]/g, "");

const lettersOnly = (value: string) =>
  value.replace(/[^a-zA-Z\s]/g, "");

const formatExpiry = (value: string) => {
  let numbers = value.replace(/\D/g, "");

  if (numbers.length >= 2) {
    const month = numbers.slice(0, 2);
    if (Number(month) > 12) numbers = "12" + numbers.slice(2);
  }

  if (numbers.length <= 2) return numbers;

  return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
};

export default function PaymentMethod() {
  const dispatch = useDispatch<AppDispatch>();

  const { paymentMethod, cardData, bankData } = useSelector(
    (state: RootState) => state.checkout
  );

  const inputClasses =
    "w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400";

  return (
    <section className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 space-y-4 text-gray-900 dark:text-gray-100">
      <h2 className="text-xl font-semibold">
        Payment Method
      </h2>

      {/* CARD OPTION */}
      <div
        className={`border border-gray-300 dark:border-gray-700 p-4 rounded space-y-3 transition ${paymentMethod === "card"
            ? "border-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-500"
            : ""
          }`}
      >
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={paymentMethod === "card"}
            onChange={() => dispatch(setPaymentMethod("card"))}
            className="accent-blue-600 dark:accent-blue-400"
          />
          Credit / Debit Card
        </label>

        {paymentMethod === "card" && (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Card Number"
              maxLength={16}
              value={cardData.number}
              onChange={(e) =>
                dispatch(
                  setCardData({
                    ...cardData,
                    number: onlyNumbers(e.target.value),
                  })
                )
              }
              className={inputClasses}
            />

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="MM/YY"
                maxLength={5}
                value={cardData.expiry}
                onChange={(e) =>
                  dispatch(
                    setCardData({
                      ...cardData,
                      expiry: formatExpiry(e.target.value),
                    })
                  )
                }
                className={inputClasses}
              />

              <input
                type="password"
                placeholder="CVV"
                maxLength={3}
                value={cardData.cvv}
                onChange={(e) =>
                  dispatch(
                    setCardData({
                      ...cardData,
                      cvv: onlyNumbers(e.target.value),
                    })
                  )
                }
                className={inputClasses}
              />
            </div>
          </div>
        )}
      </div>

      {/* BANK OPTION */}
      <div
        className={`border border-gray-300 dark:border-gray-700 p-4 rounded space-y-3 transition ${paymentMethod === "bank"
            ? "border-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-500"
            : ""
          }`}
      >
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={paymentMethod === "bank"}
            onChange={() => dispatch(setPaymentMethod("bank"))}
            className="accent-blue-600 dark:accent-blue-400"
          />
          Bank Transfer
        </label>

        {paymentMethod === "bank" && (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Account Holder Name"
              value={bankData.name}
              onChange={(e) =>
                dispatch(
                  setBankData({
                    ...bankData,
                    name: lettersOnly(e.target.value),
                  })
                )
              }
              className={inputClasses}
            />

            <input
              type="text"
              placeholder="Account Number / IBAN"
              value={bankData.account}
              onChange={(e) =>
                dispatch(
                  setBankData({
                    ...bankData,
                    account: alphaNumericOnly(e.target.value),
                  })
                )
              }
              className={inputClasses}
            />
          </div>
        )}
      </div>
    </section>
  );
}
