/** @jsxImportSource theme-ui */
import React, { ReactElement } from "react";
import { Heading } from "theme-ui";
import { useResponsiveTableContext } from "./ResponsiveTableContext";
import DefaultLabels from "./ResponsiveTableDefaultLabels";

interface Props {}

const RenderTableRows = ({}: Props): ReactElement => {
  const { columns, rows, CustomLabels } = useResponsiveTableContext();

  return (
    <tbody
      sx={{
        variant: "layout.responsiveTable.tbody",
      }}
    >
      {rows.length > 0 ? (
        rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.cells.map((cell, cellIndex) => {
              return <td key={cellIndex}>{cell.value}</td>;
            })}
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={
              columns.filter((column) => !column.asMoreInformation).length
            }
          >
            <Heading
              sx={{
                variant: "layout.responsiveTable.nothingToShow",
              }}
            >
              {CustomLabels?.noRegisters ?? DefaultLabels.noRegisters}
            </Heading>
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default RenderTableRows;
