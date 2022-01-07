/** @jsxImportSource theme-ui */
import React, { ReactElement } from "react";
import RenderTableFilters from "./RenderTableFilters";
import RenderTableHeaders from "./RenderTableHeader";
import RenderTableRows from "./RenderTableRows";
import { ResponsiveTableContext } from "./ResponsiveTableContext";
import DefaultLabels from "./ResponsiveTableDefaultLabels";
import {
  TResponsiveTableColumn,
  TResponsiveTableFilter,
  TResponsiveTableFilterChangeEvent,
  TResponsiveTableRow,
  TResponsiveTableSortChangeEvent,
} from "./responsiveTableTypes";

export interface IResponsiveTableProps {
  columns: TResponsiveTableColumn[];
  filters?: TResponsiveTableFilter[];
  rows: TResponsiveTableRow[];

  onFilterChange?: (ev: TResponsiveTableFilterChangeEvent) => void;
  onFilterBlur?: (ev: TResponsiveTableFilterChangeEvent) => void;

  onSortChange?: (ev: TResponsiveTableSortChangeEvent) => void;

  CustomLabels?: Partial<typeof DefaultLabels>;
}

export const ResponsiveTable = (props: IResponsiveTableProps): ReactElement => {
  const [tableHeight, setTableHeight] = React.useState<number>(0);
  const [parent, setParent] = React.useState<HTMLElement | null>();
  const TableRef: unknown = React.useCallback(
    (el: HTMLElement) => {
      if (el) {
        setParent(el.parentElement);
      }
    },
    [setParent]
  );
  React.useEffect(() => {
    const observer = new ResizeObserver((ev) => {
      setTableHeight(ev[0].contentRect.height);
    });
    if (parent) observer.observe(parent);

    return () => observer.disconnect();
  }, [parent, setTableHeight]);

  return (
    <ResponsiveTableContext.Provider value={props}>
      <table
        ref={TableRef as React.Ref<HTMLTableElement>}
        sx={{
          variant: "layout.responsiveTable.table",
          height: `${tableHeight}px`,
        }}
      >
        <thead>
          <RenderTableHeaders />
          <RenderTableFilters />
        </thead>
        <RenderTableRows />
      </table>
    </ResponsiveTableContext.Provider>
  );
};
