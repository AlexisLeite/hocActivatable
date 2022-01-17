/** @jsxImportSource theme-ui */
/* eslint-disable react/require-default-props */
import React from 'react';
import TableAccordionElement, {
  ITableAccordionElement,
} from './TableAccordionElement';

interface Props {
  children: (Omit<ITableAccordionElement, 'id'> &
    Partial<Pick<ITableAccordionElement, 'id'>>)[];
  onSelect?: (ctrkKey: boolean, rowIndex: number) => void;
  onToggle: (ctrkKey: boolean, index: number) => void;
  className?: string;
  open?: number[];
  highlighted?: number;
}

interface State {
  expanded: boolean[];
}

/* 
How to expand elements:

- If there is open array set, use it as initial expand values
- If the user clicks on a header, open it and only it unless the control key is pressed
- If the user clicks the checkbox, add to the selection
*/

const TableAccordion = React.memo(
  ({ children, onSelect, onToggle, className, highlighted, open }: Props) => {
    const [state, setState] = React.useState<State>({
      expanded: [],
    });

    React.useEffect(() => {
      setState((currentState) => ({
        ...currentState,
        expanded: children.map((_, index) => open?.indexOf(index) !== -1),
      }));
    }, [children, open, setState]);

    const handleElementOnSelect = React.useCallback(
      (ev: React.MouseEvent<HTMLElement>) => {
        const { rowIndex } = ev.currentTarget.dataset;
        if (rowIndex)
          if (onSelect) onSelect(ev.ctrlKey, Number.parseInt(rowIndex, 10));
      },
      [onSelect],
    );
    const handleElementOnToggle = React.useCallback(
      (ev: React.MouseEvent<HTMLElement>) => {
        const stringRowIndex = ev.currentTarget.dataset.rowIndex;
        if (stringRowIndex) {
          const rowIndex = Number.parseInt(stringRowIndex, 10);
          if (!children[rowIndex].locked) onToggle(ev.ctrlKey, rowIndex);
          setState((currentState) => ({
            ...currentState,
            expanded: currentState.expanded.map((_el, mapIndex) => {
              if (mapIndex === rowIndex) return true;
              return false;
            }),
          }));
        }
      },
      [children, onToggle],
    );

    return (
      <div
        className={`${className ?? ''} accordion`}
        sx={{
          variant: 'layout.tableAccordion',
        }}
      >
        {children.map((child, rowIndex) => {
          return (
            <TableAccordionElement
              // eslint-disable-next-line react/no-array-index-key
              key={rowIndex}
              onSelect={handleElementOnSelect}
              onToggle={handleElementOnToggle}
              collapsed={!state.expanded[rowIndex]}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...child}
              id={child.id ?? rowIndex}
              className={`${rowIndex === highlighted ? 'highlighted' : ''} ${
                child.className ?? ''
              }`}
            />
          );
        })}
      </div>
    );
  },
);

TableAccordion.displayName = 'Table accordion';

export default TableAccordion;
