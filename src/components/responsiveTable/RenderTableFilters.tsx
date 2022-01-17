/** @jsxImportSource theme-ui */
import React from 'react';
import ApiaFilter from '../ApiaFilter';
import {
  TResponsiveTableContext,
  useResponsiveTableContext,
} from './context.ResponsiveTable';
import { IResponsiveTableProps } from './state.ResponsiveTable';

export type IInnerRender = Pick<
  TResponsiveTableContext,
  'showAdditionalColumn' | 'nonAdditionalColumns'
> &
  Pick<IResponsiveTableProps, 'onFilterChange' | 'onFilterBlur' | 'filters'>;

const InnerRender = React.memo(
  ({
    showAdditionalColumn,
    nonAdditionalColumns,
    filters,
    onFilterChange,
    onFilterBlur,
  }: IInnerRender) => {
    return filters && filters.length > 0 ? (
      <tr className="headRow filtersRow">
        {showAdditionalColumn && (
          <th className="tableHeaderFilter stickyColumn" />
        )}
        {nonAdditionalColumns.map((column) => {
          const filter = filters.find(
            (currentFilter) => currentFilter.column === column.name,
          );

          return (
            <th key={column.name} className="tableHeaderFilter">
              {filter ? (
                <ApiaFilter
                  filter={filter}
                  onChange={(ev) => {
                    if (onFilterChange)
                      onFilterChange({
                        filter,
                        value: ev,
                      });
                  }}
                  onBlur={(ev) => {
                    if (onFilterBlur)
                      onFilterBlur({
                        filter,
                        value: ev,
                      });
                  }}
                />
              ) : null}
            </th>
          );
        })}
      </tr>
    ) : null;
  },
);
InnerRender.displayName = 'InnerRender';

const RenderTableFilters = () => {
  const {
    showAdditionalColumn,
    nonAdditionalColumns,
    filters,
    onFilterBlur,
    onFilterChange,
  } = useResponsiveTableContext();

  return (
    <InnerRender
      {...{
        showAdditionalColumn,
        nonAdditionalColumns,
        filters,
        onFilterBlur,
        onFilterChange,
      }}
    />
  );
};

export default RenderTableFilters;
