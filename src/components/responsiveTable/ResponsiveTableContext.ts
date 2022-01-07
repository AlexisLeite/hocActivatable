import React from "react";
import { IResponsiveTableProps } from "./ResponsiveTable";

export const ResponsiveTableContext = React.createContext<
  IResponsiveTableProps | undefined
>(undefined);

export const useResponsiveTableContext = () => {
  const tableContext = React.useContext(ResponsiveTableContext);
  if (!tableContext) throw new Error("There is no TableContext");
  return tableContext;
};
