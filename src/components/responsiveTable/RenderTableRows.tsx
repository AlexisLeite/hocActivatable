/** @jsxImportSource theme-ui */
import { FaLock } from '@meronex/icons/fa';
import React, { ReactElement } from 'react';
import { Heading } from 'theme-ui';
import { useResponsiveTableContext } from './context.ResponsiveTable';
import DefaultLabels from './ResponsiveTableDefaultLabels';

const RenderTableRows = (): ReactElement => {
  const {
    nonAdditionalColumns,
    columns,
    rows,
    CustomLabels,
    highlightedRow,
    setTableState,
    showAdditionalColumn,
    selectedRows,
    expandedRows,
    setSelectedRows,
  } = useResponsiveTableContext();

  /* 
  SHARED CALLBACK
  
  */
  const handleRowClick = (ev: React.MouseEvent<HTMLElement>) => {
    const stringRowIndex = ev.currentTarget.dataset.rowIndex;
    if (stringRowIndex) {
      const rowIndex = Number.parseInt(stringRowIndex, 10);
      if (rows[rowIndex].locked) return;
      ev.preventDefault();
      ev.stopPropagation();
      setSelectedRows(ev.ctrlKey, rowIndex);
      setTableState((currentState) => ({
        ...currentState,
        highlightedRow: rowIndex,
      }));
    }
  };

  const firstNonHiddenColumn = columns.findIndex(
    (column) => !column.asMoreInformation,
  );

  return (
    <tbody>
      {rows.length > 0 ? (
        rows.map((row, rowIndex) => {
          const selected = selectedRows.indexOf(rowIndex) !== -1;
          const expanded = expandedRows.indexOf(rowIndex) !== -1;
          return (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={rowIndex}>
              <tr
                role="row"
                data-row-index={rowIndex}
                onClick={handleRowClick}
                onDoubleClick={(ev: React.MouseEvent<HTMLElement>) => {
                  if (row.locked) return;
                  setSelectedRows(ev.ctrlKey, rowIndex);
                }}
                className={`contentRow ${selected ? 'hover' : ''} ${
                  highlightedRow === rowIndex ? 'highlighted' : ''
                } ${row.classToAdd ? row.classToAdd : ''} ${
                  row.locked ? 'locked' : ''
                }`}
              >
                {showAdditionalColumn && (
                  <td className="stickyColumn">
                    <button
                      type="button"
                      data-row-index={rowIndex}
                      onClick={(ev: React.MouseEvent<HTMLElement>) => {
                        ev.stopPropagation();

                        const stringIndex = ev.currentTarget.dataset.rowIndex;
                        if (stringIndex) {
                          const index = Number.parseInt(stringIndex, 10);
                          const isExpanded = expandedRows.indexOf(index) !== -1;
                          setTableState((state) => ({
                            ...state,
                            expandedRows: isExpanded
                              ? state.expandedRows.filter(
                                  (stateIndex) => stateIndex !== index,
                                )
                              : [...state.expandedRows, index],
                          }));
                        }
                      }}
                      onDoubleClick={(ev) => ev.stopPropagation()}
                      className="moreInformation moreInformationButton"
                    >
                      <div>{expanded ? '-' : '+'}</div>
                    </button>
                  </td>
                )}
                {row.cells.map((cell, cellIndex) => {
                  if (columns[cellIndex].asMoreInformation) return null;
                  const CustomRenderer =
                    cell.renderer ?? columns[cellIndex].renderer;
                  return (
                    <td
                      className={`${cell.classToAdd ?? ''}`}
                      key={columns[cellIndex].name}
                    >
                      {row.locked && cellIndex === firstNonHiddenColumn && (
                        <strong color="red">
                          <FaLock className="lockedIcon" />
                        </strong>
                      )}
                      {CustomRenderer ? (
                        <CustomRenderer
                          value={cell.value}
                          row={row}
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...cell.props}
                        />
                      ) : (
                        cell.value
                      )}
                    </td>
                  );
                })}
              </tr>
              {showAdditionalColumn && expanded && (
                <tr
                  role="row"
                  data-row-index={rowIndex}
                  onClick={handleRowClick}
                  className={`additionalInformation ${
                    selected ? 'hover' : ''
                  }  ${row.locked ? 'locked' : ''}`}
                  // eslint-disable-next-line react/no-array-index-key
                  key={`additional${rowIndex}`}
                >
                  <td />
                  <td colSpan={nonAdditionalColumns.length}>
                    {columns.map((column, columnIndex) => {
                      if (!column.asMoreInformation) return null;
                      const cell = row.cells[columnIndex];

                      const CustomRenderer =
                        cell.renderer ?? columns[columnIndex].renderer;

                      return (
                        <div key={column.name}>
                          <strong>{column.title}</strong>
                          {CustomRenderer ? (
                            <CustomRenderer
                              value={cell.value}
                              row={row}
                              // eslint-disable-next-line react/jsx-props-no-spreading
                              {...cell.props}
                            />
                          ) : (
                            cell.value
                          )}
                        </div>
                      );
                    })}
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })
      ) : (
        <tr>
          <td
            colSpan={
              columns.filter((column) => !column.asMoreInformation).length
            }
          >
            <Heading
              sx={{
                variant: 'layout.responsiveTable.nothingToShow',
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
