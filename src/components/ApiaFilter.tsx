/* eslint-disable react/require-default-props */
import React, { ForwardedRef } from "react";
import { Input, Select } from "theme-ui";
import { TApiaFilter, TApiaFilterValue } from "../types";

interface IApiaFilter {
  filter: TApiaFilter;
  onBlur?: (ev: TApiaFilterValue) => void;
  onChange?: (ev: TApiaFilterValue) => void;
}

const ApiaFilter = React.forwardRef<
  HTMLInputElement | HTMLSelectElement,
  IApiaFilter
>(({ filter, onChange, onBlur }, ref) => {
  const [value, setValue] = React.useState<TApiaFilterValue>(
    filter.currentValue ?? ""
  );

  const filterCurrentValue = filter?.currentValue;
  React.useEffect(() => {
    if (typeof filterCurrentValue !== "undefined") {
      setValue(filterCurrentValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCurrentValue]);

  if (filter) {
    const handleChange = (
      ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      if (onChange) onChange(ev.target.value);
      setValue(ev.target.value);
    };
    const handleBlur = (
      ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      if (onBlur) onBlur(ev.target.value);
    };

    return filter.options ? (
      <Select
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        className="filter"
        title={filter.toolTip}
        ref={ref as ForwardedRef<HTMLSelectElement>}
      >
        {filter.options.map((option) => {
          return (
            <option
              value={option.value}
              key={option.value ?? option.label ?? " "}
            >
              {option.label}
            </option>
          );
        })}
      </Select>
    ) : (
      <Input
        value={value}
        type={filter.type ?? "text"}
        placeholder={filter?.placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        className="filter"
        title={filter.toolTip}
        ref={ref as ForwardedRef<HTMLInputElement>}
      />
    );
  }
  return null;
});

ApiaFilter.displayName = "ApiaFilter";

export default React.memo(ApiaFilter);
