/* 
DEFINITIONS

*/
export type TResponsiveTableSortOptions = 'A' | 'D' | null;

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
  fixedWidth?: boolean;

  // State data
  currentSorting?: TResponsiveTableSortOptions;
  renderer?: TResponsiveTableCellRenderer;
};

export interface IResponsiveTableCellRendererProps {
  row: TResponsiveTableRow;
  [key: string]: unknown;
}

export type TResponsiveTableCellRenderer =
  | ((props: IResponsiveTableCellRendererProps) => JSX.Element)
  | React.MemoExoticComponent<
      (props: IResponsiveTableCellRendererProps) => JSX.Element
    >;

export interface IResponsiveTableCell {
  value: string;
  renderer?: TResponsiveTableCellRenderer;
  props?: Omit<IResponsiveTableCellRendererProps, 'row'>;
  classToAdd?: string;
}

export type TResponsiveTableRow = {
  cells: IResponsiveTableCell[];
  classToAdd?: string;
  id?: string | number;
  locked?: boolean;
  selected?: boolean;
};

/* 
EVENTS

*/

export type TResponsiveTableSortChangeEvent = {
  columnName: string;
  sort: TResponsiveTableSortOptions;
};
