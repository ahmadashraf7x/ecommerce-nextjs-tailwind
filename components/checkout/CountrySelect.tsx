"use client";

import { useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

interface CountryOption {
  label: string;
  value: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function CountrySelect({ value, onChange }: Props) {
  const countries = useMemo<CountryOption[]>(
    () => countryList().getData(),
    []
  );

  return (
    <Select
      options={countries}
      value={countries.find((c) => c.value === value)}
      onChange={(option) =>
        onChange((option as CountryOption)?.value || "")
      }
      isSearchable
      placeholder="Select country"

      unstyled   // ⭐ أهم سطر

      classNames={{
        control: () =>
          "bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md px-2 min-h-[42px]",

        menu: () =>
          "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md mt-1",

        option: (state) =>
          `px-3 py-2 cursor-pointer ${state.isFocused
            ? "bg-gray-100 dark:bg-gray-800"
            : ""
          } text-gray-900 dark:text-white`,

        singleValue: () =>
          "text-gray-900 dark:text-white",

        input: () =>
          "text-gray-900 dark:text-white",

        placeholder: () =>
          "text-gray-400 dark:text-gray-500",
      }}
    />
  );
}