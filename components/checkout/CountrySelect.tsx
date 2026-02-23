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
      value={countries.find((c: CountryOption) => c.value === value)}
      onChange={(option) =>
        onChange((option as CountryOption)?.value || "")
      }
      isSearchable
      placeholder="Select country"
    />
  );
}