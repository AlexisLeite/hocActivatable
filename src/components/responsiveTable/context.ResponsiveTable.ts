import React from 'react';
import {
  IResponsiveTableProps,
  IResponsiveTableState,
} from './state.ResponsiveTable';
import { TResponsiveTableColumn } from './types.responsiveTable';

export type TResponsiveTableContext = IResponsiveTableProps &
  IResponsiveTableState & {
    setTableState: React.Dispatch<React.SetStateAction<IResponsiveTableState>>;
    additionalColumns: TResponsiveTableColumn[];
    nonAdditionalColumns: TResponsiveTableColumn[];
    showAdditionalColumn: boolean;
    responsiveMode: boolean;
    focusSelectedElement: () => void;
    setSelectedRows: (
      ctrlKey: boolean,
      selectionIndex: number,
      addition?: boolean,
    ) => void;
  };

export const ResponsiveTableContext = React.createContext<
  TResponsiveTableContext | undefined
>(undefined);

export const useResponsiveTableContext = () => {
  const tableContext = React.useContext(ResponsiveTableContext);
  if (!tableContext) throw new Error('There is no TableContext');
  return tableContext;
};
