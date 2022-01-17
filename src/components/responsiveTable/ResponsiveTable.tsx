/* eslint-disable react/destructuring-assignment */
/** @jsxImportSource theme-ui */
import React, { ReactElement } from 'react';
import { useBreakpointIndex } from '@theme-ui/match-media';
import { Spinner, ThemeUIStyleObject } from 'theme-ui';
import { CSSTransition } from 'react-transition-group';
import RenderTableFilters from './RenderTableFilters';
import RenderTableHeaders from './RenderTableHeader';
import RenderTableRows from './RenderTableRows';
import { ResponsiveTableContext } from './context.ResponsiveTable';
import {
  useCommandKeys,
  useKeys,
  useResizeResponsiveTable,
  useResponsiveTableSelectRows,
} from './hooks.ResponsiveTable';
import {
  IResponsiveTableProps,
  IResponsiveTableState,
} from './state.ResponsiveTable';
import TableAccordion from './tableAccordion/TableAccordion';
import { ITableAccordionElement } from './tableAccordion/TableAccordionElement';

export interface IInnerRender {
  handleTableFocus: () => void;
  handleTableBlur: () => void;
  containerSx: ThemeUIStyleObject;
  tableRef: React.Ref<HTMLDivElement>;
  responsiveMode: boolean;
  handleAccordionOnToggle: (ctrlKey: boolean, rowIndex: number) => void;
  handleAccordionSelect: (ctrlKey: boolean, rowIndex: number) => void;
  accordionChildren: Omit<ITableAccordionElement, 'id'>[];
  accordionOpen: number[];
  accordionHighlighted: number;
  Footer?: React.ReactNode;
  loading?: boolean;
}

const InnerRender = React.memo((props: IInnerRender) => {
  const sectionDoubleClick = React.useCallback(
    (ev: React.MouseEvent) => {
      if (props.handleAccordionSelect)
        props.handleAccordionSelect(ev.ctrlKey, -10);
    },
    [props],
  );
  return (
    <section
      role="grid"
      tabIndex={0}
      onFocus={props.handleTableFocus}
      onBlur={props.handleTableBlur}
      ref={props.tableRef}
      sx={props.containerSx}
      className="contentExplorer"
      onDoubleClick={sectionDoubleClick}
    >
      {props.loading && (
        <CSSTransition classNames="tableLoading" timeout={1000} in appear>
          <div className="tableLoading">
            <Spinner />
          </div>
        </CSSTransition>
      )}
      <div>
        {!props.responsiveMode ? (
          <table>
            <thead>
              <RenderTableHeaders />
              <RenderTableFilters />
            </thead>
            <RenderTableRows />
          </table>
        ) : (
          <TableAccordion
            onToggle={props.handleAccordionOnToggle}
            onSelect={props.handleAccordionSelect}
            open={props.accordionOpen}
            highlighted={props.accordionHighlighted}
          >
            {props.accordionChildren}
          </TableAccordion>
        )}
      </div>
      <footer
        onDoubleClick={(ev) => {
          ev.preventDefault();
          ev.stopPropagation();
        }}
      >
        {props.Footer}
      </footer>
    </section>
  );
});

const ResponsiveTable = (props: IResponsiveTableProps): ReactElement => {
  const [tableState, setTableState] = React.useState<IResponsiveTableState>({
    highlightedRow: 0,
    focused: false,
    selectedRows: props.rows
      .map((row, rowIndex) => (row.selected ? rowIndex : -10))
      .filter((index) => index >= 0),
    expandedRows: [],
  });

  const { table, tableRef, tableHeight } = useResizeResponsiveTable();
  const breakpoint = useBreakpointIndex({
    defaultIndex: 3,
  });
  const responsiveMode = breakpoint < (props.responsiveIndex ?? 4);

  /* 
  HANDLE SCROLL

  */
  const focusSelectedElement = React.useCallback(() => {
    const highlightedRow = table?.querySelector('.highlighted') as HTMLElement;
    if (tableState.focused && highlightedRow && table) {
      if (responsiveMode) {
        highlightedRow.scrollIntoView({
          block: 'nearest',
          inline: 'nearest',
        });
      } else {
        const thead = table.querySelector('thead') as HTMLElement;

        if (highlightedRow.offsetTop - table.scrollTop < thead.offsetHeight) {
          highlightedRow.scrollIntoView({
            block: 'center',
            inline: 'nearest',
          });
        } else
          highlightedRow.scrollIntoView({
            block: 'nearest',
            inline: 'nearest',
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, tableState.focused]);
  /* 
  UPDATE SELECTED ROWS

  */

  React.useEffect(() => {
    setTableState((state) => ({
      ...state,
      selectedRows: props.rows
        .map((row, rowIndex) => (row.selected ? rowIndex : -10))
        .filter((index) => index >= 0),
      highlightedRow:
        !props.rows[state.highlightedRow] ||
        props.rows[state.highlightedRow].locked
          ? props.rows.findIndex((row) => !row.locked)
          : state.highlightedRow,
    }));
  }, [props.rows]);

  React.useEffect(() => {
    if (props.onChangeSelection && tableState.selectedRows.length > 0)
      props.onChangeSelection(tableState.selectedRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableState.selectedRows]);

  /* 
  ROWS SELECTOR

  */
  const selectRowsHandler = React.useCallback(
    (newSelectedRows: number[]) => {
      setTableState((currentState) => ({
        ...currentState,
        selectedRows: newSelectedRows,
      }));
    },
    [setTableState],
  );
  const [hookSetSelectedRows] = useResponsiveTableSelectRows(
    {
      multiple: props.multiple,
    },
    selectRowsHandler,
  );
  const setSelectedRows = React.useCallback(
    (
      ctrlKey: boolean,
      selectionIndex: number,
      addition?: boolean | undefined,
    ) => {
      if (props.rows[selectionIndex].locked) return;
      hookSetSelectedRows(ctrlKey, selectionIndex, addition);
    },
    [props.rows, hookSetSelectedRows],
  );

  /* 
  HANDLE KEY EVENTS
  
  */
  const { control, shift } = useCommandKeys();
  useKeys(
    [
      {
        key: 'ArrowDown',
        type: 'keydown',
        callback: (ev) => {
          ev.stopImmediatePropagation();
          ev.preventDefault();
          if (tableState.focused) {
            let newIndex = tableState.highlightedRow;
            do {
              newIndex += 1;
              if (newIndex >= props.rows.length) newIndex = 0;
            } while (
              newIndex !== tableState.highlightedRow &&
              props.rows[newIndex].locked
            );
            if (newIndex === tableState.highlightedRow) return;

            if (!control) {
              setSelectedRows(ev.ctrlKey, newIndex);
            }
            setTableState((currentState) => ({
              ...currentState,
              highlightedRow: newIndex,
            }));
            focusSelectedElement();
          }
        },
      },
      {
        key: 'ArrowUp',
        type: 'keydown',
        callback: (ev) => {
          ev.stopImmediatePropagation();
          ev.preventDefault();
          if (tableState.focused) {
            let newIndex = tableState.highlightedRow;
            do {
              newIndex -= 1;
              if (newIndex < 0) newIndex = props.rows.length - 1;
            } while (
              newIndex !== tableState.highlightedRow &&
              props.rows[newIndex].locked
            );
            if (newIndex === tableState.highlightedRow) return;

            if (!control) {
              setSelectedRows(ev.ctrlKey, newIndex);
            }
            setTableState((currentState) => ({
              ...currentState,
              highlightedRow: newIndex,
            }));
            focusSelectedElement();
          }
        },
      },
      {
        type: 'keydown',
        key: ' ',
        callback: (ev) => {
          ev.stopImmediatePropagation();
          ev.preventDefault();
          if (tableState.focused) {
            setSelectedRows(ev.ctrlKey, tableState.highlightedRow);
          }
        },
      },
      {
        type: 'keyup',
        key: 'Enter',
        callback: (ev) => {
          ev.preventDefault();
          ev.stopImmediatePropagation();
          if (props.onSelectRows && tableState.focused)
            props.onSelectRows(tableState.selectedRows);
        },
      },
      {
        type: 'keydown',
        key: 'ArrowRight',
        callback: (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          if (table && shift) {
            table.scrollLeft += 50;
            return;
          }
          setTableState((state) => ({
            ...state,
            expandedRows: [...state.expandedRows, tableState.highlightedRow],
          }));
        },
      },
      {
        type: 'keydown',
        key: 'ArrowLeft',
        callback: (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          if (table && shift) {
            table.scrollLeft -= 50;
            return;
          }
          setTableState((state) => ({
            ...state,
            expandedRows: state.expandedRows.filter(
              (rowIndex) => rowIndex !== tableState.highlightedRow,
            ),
          }));
        },
      },
    ],
    [setSelectedRows, setTableState],
  );

  /* 
  RENDER
  
  */

  const additionalColumns = React.useMemo(
    () => props.columns.filter((column) => column.asMoreInformation),
    [props.columns],
  );
  const nonAdditionalColumns = React.useMemo(
    () => props.columns.filter((column) => !column.asMoreInformation),
    [props.columns],
  );

  /* 
  TABLE PROPS
  
  */
  const handleTableFocus = React.useCallback(() => {
    console.log('table focus');
    setTableState((state) => ({ ...state, focused: true }));
  }, [setTableState]);
  const handleTableBlur = React.useCallback(() => {
    setTableState((state) => ({ ...state, focused: false }));
  }, [setTableState]);
  const containerSx = React.useMemo(
    () => ({
      variant: 'layout.responsiveTable',
      height: `${tableHeight}px`,
    }),
    [tableHeight],
  );

  /* 
  ACCORDION PROPS
  
  */
  const handleAccordionOnToggle = React.useCallback(
    (ctrlKey: boolean, rowIndex: number) => {
      setSelectedRows(ctrlKey, rowIndex);
      setTableState((state) => ({ ...state, highlightedRow: rowIndex }));
    },
    [setSelectedRows],
  );
  const handleAccordionSelect = React.useCallback(() => {
    if (props.onSelectRows) props.onSelectRows(tableState.selectedRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const accordionChildren = React.useMemo(() => {
    return props.rows.map((row, rowIndex) => {
      return {
        title: row.cells
          .filter(
            (_, cellIndex) =>
              !props.columns[cellIndex].asMoreInformation &&
              !props.columns[cellIndex].renderer,
          )
          .reduce((title, cell) => {
            return `${title} ${cell.value}`;
          }, ''),
        renderTitle: (
          <div className="defaultTitleRender">
            {row.cells
              .filter(
                (_, cellIndex) =>
                  !props.columns[cellIndex].asMoreInformation &&
                  !props.columns[cellIndex].renderer,
              )
              .map((cell, colIndex) => {
                return (
                  <span key={props.columns[colIndex].name}>{cell.value}</span>
                );
              }, '')}
          </div>
        ),
        children: row.cells.map((cell, cellIndex) => {
          const column = props.columns[cellIndex];
          const CustomRenderer =
            cell.renderer ?? props.columns[cellIndex].renderer;
          return (
            <div
              key={column.name}
              className={`${cell.classToAdd ?? ''} accordionCell`}
            >
              <strong>{column.title}</strong>
              {CustomRenderer ? (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <CustomRenderer value={cell.value} row={row} {...cell.props} />
              ) : (
                cell.value
              )}
            </div>
          );
        }),
        id: row.id,
        locked: row.locked,
        className: row.classToAdd,
        rowIndex,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.rows]);

  const context = React.useMemo(() => {
    return {
      ...props,
      ...tableState,
      setTableState,
      additionalColumns,
      nonAdditionalColumns,
      showAdditionalColumn: !!(additionalColumns.length > 0),
      responsiveMode,
      focusSelectedElement,
      setSelectedRows,
    };
  }, [
    props,
    tableState,
    setTableState,
    additionalColumns,
    nonAdditionalColumns,
    responsiveMode,
    focusSelectedElement,
    setSelectedRows,
  ]);

  return (
    <ResponsiveTableContext.Provider value={context}>
      <InnerRender
        handleTableFocus={handleTableFocus}
        handleTableBlur={handleTableBlur}
        tableRef={tableRef as React.Ref<HTMLDivElement>}
        containerSx={containerSx}
        responsiveMode={responsiveMode}
        handleAccordionOnToggle={handleAccordionOnToggle}
        handleAccordionSelect={handleAccordionSelect}
        accordionChildren={accordionChildren}
        accordionOpen={tableState.selectedRows}
        accordionHighlighted={tableState.highlightedRow}
        Footer={props.Footer}
        loading={props.loading}
      />
    </ResponsiveTableContext.Provider>
  );
};
export default ResponsiveTable;

InnerRender.displayName = 'Table Inner Render';
