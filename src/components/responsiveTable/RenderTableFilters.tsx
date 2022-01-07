/** @jsxImportSource theme-ui */
import React from "react";
import { useResponsiveTableContext } from "./ResponsiveTableContext";
import {
  TResponsiveTableFilter,
  TResponsiveTableFilterValue,
} from "./responsiveTableTypes";

const RenderFilter = ({ filter }: { filter?: TResponsiveTableFilter }) => {
  const { onFilterBlur, onFilterChange } = useResponsiveTableContext();
  const [value, setValue] = React.useState<TResponsiveTableFilterValue>(
    filter?.currentValue ?? ""
  );

  const filterCurrentValue = filter?.currentValue;
  React.useEffect(() => {
    if (typeof filterCurrentValue !== "undefined") {
      setValue(filterCurrentValue);
    }
  }, [filterCurrentValue]);

  if (filter) {
    const handleChange = (
      ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      if (onFilterChange)
        onFilterChange({
          columnName: filter.columnName,
          currentValue: ev.target.value,
        });
      setValue(ev.target.value);
    };
    const handleBlur = (
      ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      if (onFilterBlur)
        onFilterBlur({
          columnName: filter.columnName,
          currentValue: ev.target.value,
        });
    };

    return filter.options ? (
      <select
        onChange={handleChange}
        onBlur={handleBlur}
        defaultValue={filter.currentValue}
        value={value}
      >
        {filter.options.map((option) => {
          return (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    ) : (
      <input
        defaultValue={filter.currentValue}
        value={value}
        type={filter.type ?? "text"}
        placeholder={filter?.placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    );
  }
  return null;
};

const RenderTableFilters = () => {
  const { columns, filters } = useResponsiveTableContext();

  return filters && filters.length > 0 ? (
    <tr>
      {columns.map((column) => {
        const filter = filters.find(
          (currentFilter) => currentFilter.columnName === column.name
        );
        return (
          <th
            key={column.name}
            sx={{ variant: "layout.responsiveTable.filter" }}
          >
            <RenderFilter filter={filter} />
          </th>
        );
      })}
    </tr>
  ) : null;
};

export default RenderTableFilters;
