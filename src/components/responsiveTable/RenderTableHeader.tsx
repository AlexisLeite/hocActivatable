/** @jsxImportSource theme-ui */
import { FaMinus, FaArrowUp, FaArrowDown } from "@meronex/icons/fa";
import { IconType } from "@meronex/icons";
import { useResponsiveTableContext } from "./ResponsiveTableContext";
import { Button } from "theme-ui";
import { TResponsiveTableSortOptions } from "./responsiveTableTypes";

const RenderTableHeaders = () => {
  const { columns, onSortChange } = useResponsiveTableContext();

  return (
    <tr>
      {columns
        .filter((column) => !column.asMoreInformation)
        .map((column) => {
          // Theme variant
          let variant = "layout.responsiveTable.column";
          if (column.required) variant += "-required";

          let Icon: IconType | (() => JSX.Element) = () => <></>;
          if (column.enableSorting) {
            if (column.currentSorting === "A") Icon = FaArrowDown;
            else if (column.currentSorting === "D") Icon = FaArrowUp;
            else Icon = FaMinus;
          }

          const label = (
            <>
              {column.title ?? column.name ?? ""}
              <Icon />
            </>
          );

          return (
            <th
              key={column.name}
              sx={{
                variant,
                ...(column.width
                  ? {
                      minWidth: `${column.width}px`,
                    }
                  : {}),
              }}
              title={column.toolTip}
            >
              <div>
                {column.enableSorting ? (
                  <Button
                    onClick={() => {
                      let newSort: TResponsiveTableSortOptions =
                        column.currentSorting === "A" ? "D" : "A";

                      if (onSortChange)
                        onSortChange({
                          columnName: column.name,
                          sort: newSort,
                        });
                    }}
                  >
                    {label}
                  </Button>
                ) : (
                  <div>{label}</div>
                )}
              </div>
            </th>
          );
        })}
    </tr>
  );
};

export default RenderTableHeaders;
