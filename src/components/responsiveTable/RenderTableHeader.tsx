/** @jsxImportSource theme-ui */
import { FaMinus, FaArrowUp, FaArrowDown } from '@meronex/icons/fa';
import { IconType } from '@meronex/icons';
import { Button } from 'theme-ui';
import React from 'react';
import {
  TResponsiveTableContext,
  useResponsiveTableContext,
} from './context.ResponsiveTable';
import { TResponsiveTableSortOptions } from './types.responsiveTable';
import { IResponsiveTableProps } from './state.ResponsiveTable';

type TInnerRender = Pick<
  TResponsiveTableContext,
  'showAdditionalColumn' | 'nonAdditionalColumns'
> &
  Pick<IResponsiveTableProps, 'onSortChange'>;

// eslint-disable-next-line react/jsx-no-useless-fragment
const EmptyFragment = () => <></>;
const InnerRender = React.memo(
  ({
    showAdditionalColumn,
    nonAdditionalColumns,
    onSortChange,
  }: TInnerRender) => {
    /* const totalWidth = nonAdditionalColumns.reduce((total, currentCell) => {
      return total + (currentCell.width ?? 0);
    }, 0); */
    return (
      <tr className="titles">
        {showAdditionalColumn && <th className="stickyColumn" />}
        {nonAdditionalColumns
          .filter((column) => !column.asMoreInformation)
          .map((column, columnIndex) => {
            // Theme variant
            let Icon: IconType | (() => JSX.Element) = EmptyFragment;
            if (column.enableSorting) {
              if (column.currentSorting === 'A') Icon = FaArrowDown;
              else if (column.currentSorting === 'D') Icon = FaArrowUp;
              else Icon = FaMinus;
            }

            const label = (
              <>
                {column.title ?? column.name ?? ''}
                <Icon />
              </>
            );

            const thSx = {
              ...(column.width
                ? {
                    minWidth: `${column.width}px` /* 
                    width: `${(100 * column.width) / totalWidth}%`, */,
                    ...(column.fixedWidth
                      ? {
                          width: `${column.width}px`,
                        }
                      : {}),
                  }
                : {}),
            };

            return (
              <th
                key={column.name}
                className={column.required ? 'required' : ''}
                sx={thSx}
                title={column.toolTip}
              >
                <div>
                  {column.enableSorting ? (
                    <Button
                      onClick={() => {
                        const newSort: TResponsiveTableSortOptions =
                          column.currentSorting === 'A' ? 'D' : 'A';

                        if (onSortChange)
                          onSortChange({
                            columnIndex,
                            columnName: column.name,
                            sort: newSort,
                          });
                      }}
                      className="headButton"
                    >
                      <span />
                      {label}
                    </Button>
                  ) : (
                    <div className="headButton">{label}</div>
                  )}
                </div>
              </th>
            );
          })}
      </tr>
    );
  },
);

InnerRender.displayName = 'InnerRender';

const RenderTableHeaders = () => {
  const { showAdditionalColumn, nonAdditionalColumns, onSortChange } =
    useResponsiveTableContext();

  return (
    <InnerRender
      {...{ showAdditionalColumn, nonAdditionalColumns, onSortChange }}
    />
  );
};

export default RenderTableHeaders;
