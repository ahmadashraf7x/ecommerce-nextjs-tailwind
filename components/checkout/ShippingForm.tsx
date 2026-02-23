"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "store-redux";
import { setShippingInfo } from "store-redux/checkoutSlice";
import { validateShippingInfo } from "utils/checkout/shippingValidation";
import CountrySelect from "./CountrySelect";
import PhoneInputField from "./PhoneInputField";

export default function ShippingForm() {
  const dispatch = useDispatch<AppDispatch>();

  const shippingInfo = useSelector(
    (state: RootState) => state.checkout.shippingInfo
  );

  const submitAttempted = useSelector(
    (state: RootState) => state.checkout.submitAttempted
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!submitAttempted) return;
    const validationErrors = validateShippingInfo(shippingInfo);
    setErrors(validationErrors);
  }, [submitAttempted, shippingInfo]);

  const handleChange = (
    field: keyof typeof shippingInfo,
    value: string
  ) => {
    dispatch(
      setShippingInfo({
        ...shippingInfo,
        [field]: value,
      })
    );
  };

  const inputClasses =
    "w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400";

  return (
    <section className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 space-y-4 text-gray-900 dark:text-gray-100">
      <h2 className="text-xl font-semibold">
        Shipping Information
      </h2>

      <input
        type="text"
        placeholder="Full Name"
        value={shippingInfo.fullName}
        onChange={(e) => handleChange("fullName", e.target.value)}
        className={inputClasses}
      />
      {submitAttempted && errors.fullName && (
        <p className="text-red-600 dark:text-red-400 text-sm">
          {errors.fullName}
        </p>
      )}

      <input
        type="email"
        placeholder="Email"
        value={shippingInfo.email}
        onChange={(e) => handleChange("email", e.target.value)}
        className={inputClasses}
      />
      {submitAttempted && errors.email && (
        <p className="text-red-600 dark:text-red-400 text-sm">
          {errors.email}
        </p>
      )}

      <PhoneInputField
        value={shippingInfo.phone}
        defaultCountry="EG"
        onChange={(phone) =>
          dispatch(
            setShippingInfo({
              ...shippingInfo,
              phone,
            })
          )
        }
      />

      {submitAttempted && errors.phone && (
        <p className="text-red-600 dark:text-red-400 text-sm">
          {errors.phone}
        </p>
      )}

      <CountrySelect
        value={shippingInfo.country}
        onChange={(country) =>
          dispatch(
            setShippingInfo({
              ...shippingInfo,
              country,
            })
          )
        }
      />

      {submitAttempted && errors.country && (
        <p className="text-red-600 dark:text-red-400 text-sm">
          {errors.country}
        </p>
      )}

      <input
        type="text"
        placeholder="City"
        value={shippingInfo.city}
        onChange={(e) => handleChange("city", e.target.value)}
        className={inputClasses}
      />
      {submitAttempted && errors.city && (
        <p className="text-red-600 dark:text-red-400 text-sm">
          {errors.city}
        </p>
      )}

      <input
        type="text"
        placeholder="Address"
        value={shippingInfo.address}
        onChange={(e) => handleChange("address", e.target.value)}
        className={inputClasses}
      />
      {submitAttempted && errors.address && (
        <p className="text-red-600 dark:text-red-400 text-sm">
          {errors.address}
        </p>
      )}
    </section>
  );
}
