import React from 'react';
import { TApiaFilter, TApiaFilterValue } from '../../../types';
import DefaultLabels from './ResponsiveTableDefaultLabels';
import {
  TResponsiveTableColumn,
  TResponsiveTableRow,
  TResponsiveTableSortChangeEvent,
} from './types.responsiveTable';

export interface IResponsiveTableState {
  highlightedRow: number;
  focused: boolean;
  selectedRows: number[];
  expandedRows: number[];
}

export interface IResponsiveTableProps {
  columns: TResponsiveTableColumn[];
  filters?: TApiaFilter[];
  rows: TResponsiveTableRow[];

  onFilterChange?: (ev: {
    filter: TApiaFilter;
    value: TApiaFilterValue;
  }) => unknown;
  onFilterBlur?: (ev: {
    filter: TApiaFilter;
    value: TApiaFilterValue;
  }) => unknown;

  onSortChange?: (ev: TResponsiveTableSortChangeEvent) => unknown;

  multiple?: boolean;
  onChangeSelection?: (ev: number[]) => unknown;
  onSelectRows?: (ev: number[]) => unknown;

  CustomLabels?: Partial<typeof DefaultLabels>;
  className?: string;
  Footer?: React.ReactNode;

  loading?: boolean;
  responsiveIndex?: number;
}
