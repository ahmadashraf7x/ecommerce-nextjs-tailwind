"use client";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
  defaultCountry?: string;
}

export default function PhoneInputField({
  value,
  onChange,
  defaultCountry = "EG",
}: Props) {
  return (
    <div className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 dark:focus-within:ring-blue-400">
      <PhoneInput
        international
        defaultCountry={defaultCountry as any}
        value={value}
        onChange={(value) => onChange(value || "")}
        className="PhoneInputCustom"
      />
    </div>
  );
}