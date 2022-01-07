/* 
DEFINITIONS

*/
export type TResponsiveTableSortOptions = "A" | "D" | null;

export type TResponsiveTableColumn = {
  // Information
  name: string;
  title: string;
  toolTip?: string;

  // Configuration
  asMoreInformation?: boolean;
  required?: boolean;
  enableSorting?: boolean;
  width?: number;

  // State data
  currentSorting?: TResponsiveTableSortOptions;
  renderer?: TResponsiveTableCellRenderer;
};

export type TResponsiveTableFilterValue = string | number;

export type TResponsiveTableFilterOption = {
  label: string;
  value: TResponsiveTableFilterValue;
};

export type TResponsiveTableFilter = {
  // Information
  columnName: string;
  placeholder?: string;
  toolTip?: string;
  currentValue?: TResponsiveTableFilterValue;

  // If it has options, it will be a select
  options?: TResponsiveTableFilterOption[];

  // There it could be more types in the future, if no type then it is an input
  type?: "date";
};

export interface IResponsiveTableCellRendererProp {
  row: TResponsiveTableRow;
  [key: string]: unknown;
}

export type TResponsiveTableCellRenderer = (
  props: IResponsiveTableCellRendererProp
) => JSX.Element;

export type TResponsiveTableCell = {
  value: string;
  renderer?: TResponsiveTableCellRenderer;
  props?: Omit<IResponsiveTableCellRendererProp, "row">;
};

export type TResponsiveTableRow = {
  cells: TResponsiveTableCell[];

  selected?: boolean;
};

/* 
EVENTS

*/
export type TResponsiveTableFilterChangeEvent = {
  columnName: string;
  currentValue: string;
};

export type TResponsiveTableSortChangeEvent = {
  columnName: string;
  sort: TResponsiveTableSortOptions;
};
