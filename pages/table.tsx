/** @jsxImportSource theme-ui */
import React from "react";
import { Heading } from "theme-ui";
import { ResponsiveTable } from "../src/components/responsiveTable/ResponsiveTable";
import {
  TResponsiveTableColumn,
  TResponsiveTableFilter,
  TResponsiveTableRow,
} from "../src/components/responsiveTable/responsiveTableTypes";

const columns: TResponsiveTableColumn[] = [
  {
    name: "Product",
    title: "Producto",
    required: true,
    enableSorting: true,
    currentSorting: "A",
    toolTip: "Compre su producto",
    width: 500,
  },
  {
    name: "Client",
    title: "Cliente",
    required: false,
    enableSorting: false,
    currentSorting: "A",
    toolTip: "Nombre del cliente",
    asMoreInformation: false,
    width: 300,
  },
];
const filters: TResponsiveTableFilter[] = [
  {
    columnName: "Product",
    placeholder: "Producto",
  },
  {
    columnName: "Client",
    options: [
      { label: "Alexis", value: 0 },
      { label: "Valeria", value: 1 },
    ],
  },
];
const rows: TResponsiveTableRow[] = [
  { cells: [{ value: "Impresora" }, { value: "Alexis" }], selected: true },
  { cells: [{ value: "Televisor" }, { value: "Valeria" }] },
  { cells: [{ value: "Notebook" }, { value: "Jorge" }] },
  {
    cells: [{ value: "Play station 4" }, { value: "Alexander" }],
  },
  { cells: [{ value: "Impresora" }, { value: "Alexis" }], selected: true },
  { cells: [{ value: "Televisor" }, { value: "Valeria" }] },
  { cells: [{ value: "Notebook" }, { value: "Jorge" }] },
  {
    cells: [{ value: "Play station 4" }, { value: "Alexander" }],
  },
  { cells: [{ value: "Impresora" }, { value: "Alexis" }], selected: true },
  { cells: [{ value: "Televisor" }, { value: "Valeria" }] },
  { cells: [{ value: "Notebook" }, { value: "Jorge" }] },
  {
    cells: [{ value: "Play station 4" }, { value: "Alexander" }],
  },
  { cells: [{ value: "Impresora" }, { value: "Alexis" }], selected: true },
  { cells: [{ value: "Televisor" }, { value: "Valeria" }] },
  { cells: [{ value: "Notebook" }, { value: "Jorge" }] },
  {
    cells: [{ value: "Play station 4" }, { value: "Alexander" }],
  },
  { cells: [{ value: "Impresora" }, { value: "Alexis" }], selected: true },
  { cells: [{ value: "Televisor" }, { value: "Valeria" }] },
  { cells: [{ value: "Notebook" }, { value: "Jorge" }] },
  {
    cells: [{ value: "Play station 4" }, { value: "Alexander" }],
  },
  { cells: [{ value: "Impresora" }, { value: "Alexis" }], selected: true },
  { cells: [{ value: "Televisor" }, { value: "Valeria" }] },
  { cells: [{ value: "Notebook" }, { value: "Jorge" }] },
  {
    cells: [{ value: "Play station 4" }, { value: "Alexander" }],
  },
  { cells: [{ value: "Impresora" }, { value: "Alexis" }], selected: true },
  { cells: [{ value: "Televisor" }, { value: "Valeria" }] },
  { cells: [{ value: "Notebook" }, { value: "Jorge" }] },
  {
    cells: [{ value: "Play station 4" }, { value: "Alexander" }],
  },
  { cells: [{ value: "Impresora" }, { value: "Alexis" }], selected: true },
  { cells: [{ value: "Televisor" }, { value: "Valeria" }] },
  { cells: [{ value: "Notebook" }, { value: "Jorge" }] },
  {
    cells: [{ value: "Play station 4" }, { value: "Alexander" }],
  },
];

const Home = () => {
  const [show, setShow] = React.useState(false);
  return (
    <div
      sx={{
        maxWidth: "600px",
        overflow: "hidden",
        height: "450px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "stretch",
      }}
    >
      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        Toggle
      </button>
      {show && <Heading sx={{ marginY: 20 }}>A heading</Heading>}
      <div
        sx={{
          flexBasis: "100%",
          flexGrow: 1,
          flexShrink: 1,
          overflow: "hidden",
        }}
      >
        <ResponsiveTable
          columns={columns}
          filters={filters}
          rows={rows}
          onFilterBlur={(ev) => {
            console.log("Filter blur", { ev });
          }}
          onFilterChange={(ev) => {
            console.log("Filter change", { ev });
          }}
          onSortChange={(ev) => {
            console.log("Sort change", { ev });
          }}
          CustomLabels={{
            noRegisters: "Lamentablemente, no hay nada para mostrar",
          }}
        />
      </div>
      {show && <Heading sx={{ marginY: 20 }}>A heading</Heading>}
    </div>
  );
};

export default Home;
