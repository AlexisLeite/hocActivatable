import React from 'react';

export const useResizeResponsiveTable = () => {
  const [tableHeight, setTableHeight] = React.useState<number>(0);
  const [parent, setParent] = React.useState<HTMLElement | null>();
  const [table, setTable] = React.useState<HTMLElement | null>();

  const tableRef: unknown = React.useCallback(
    (el: HTMLElement) => {
      if (el) {
        setParent(el.parentElement);
        setTable(el);
      }
    },
    [setParent],
  );
  React.useEffect(() => {
    const observer = new ResizeObserver((ev) => {
      setTableHeight(ev[0].contentRect.height);
    });
    if (parent) observer.observe(parent);

    return () => observer.disconnect();
  }, [parent, setTableHeight]);

  return { table, tableRef, tableHeight };
};

export const useCommandKeys = () => {
  const [pressedKeys, setPressedKeys] = React.useState<{
    control: boolean;
    shift: boolean;
    alt: boolean;
  }>({ alt: false, control: false, shift: false });

  React.useEffect(() => {
    function handleControl(ev: globalThis.KeyboardEvent) {
      if (ev.repeat) return;
      if (ev.key === 'Control') {
        setPressedKeys((state) => ({
          ...state,
          control: ev.type === 'keydown',
        }));
      }
      if (ev.key === 'Shift') {
        setPressedKeys((state) => ({
          ...state,
          shift: ev.type === 'keydown',
        }));
      }
      if (ev.key === 'Alt') {
        setPressedKeys((state) => ({
          ...state,
          alt: ev.type === 'keydown',
        }));
      }
    }
    window.addEventListener('keydown', handleControl);
    window.addEventListener('keyup', handleControl);

    return () =>
      // eslint-disable-next-line no-void
      void window.removeEventListener('keydown', handleControl) ||
      // eslint-disable-next-line no-void
      void window.removeEventListener('keydown', handleControl);
  }, [setPressedKeys]);

  return pressedKeys;
};

type TUseKeysProps = {
  key: string;
  callback: (ev: KeyboardEvent) => void;
  type: 'keydown' | 'keyup';
}[];
export const useKeys = (defs: TUseKeysProps, dependencies: unknown[]) => {
  React.useEffect(() => {
    const handlers = defs.map((definition) => {
      return {
        ...definition,
        callback: (ev: KeyboardEvent) => {
          if (ev.key === definition.key && ev.type === definition.type)
            definition.callback(ev);
        },
      };
    });

    handlers.forEach((handler) =>
      window.addEventListener(handler.type, handler.callback),
    );

    return () => {
      handlers.forEach((handler) =>
        window.removeEventListener(handler.type, handler.callback),
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defs, ...dependencies]);
};

/* 

Every time a person clicks a row:
  - If control is pressed:
    - If the row is selected: It is removed from the selection list, unless there is no other selected row
    - If the row is not selected: It is added to the selection list
  - If control is not pressed:
    - The row is setted as the only selected row

*/

export const useResponsiveTableSelectRows: (
  { multiple }: { multiple?: boolean },
  outerSetSelectedRows?: (newSelectedRows: number[]) => void,
) => [
  (ctrlKey: boolean, selectionIndex: number, addition?: boolean) => void,
] = ({ multiple }, outerSetSelectedRows) => {
  const [, setSelectedRows] = React.useState<number[]>([0]);

  const returnFunction = React.useCallback(
    (ctrlKey: boolean, selectionIndex: number, addition?: boolean) => {
      setSelectedRows((currentSelectedRows) => {
        let newSelectedRows: number[] = [];
        if (multiple && (ctrlKey || addition)) {
          if (currentSelectedRows.indexOf(selectionIndex) !== -1) {
            newSelectedRows = currentSelectedRows.filter(
              (current) => current !== selectionIndex,
            );
          } else {
            newSelectedRows = [...currentSelectedRows, selectionIndex];
          }
        } else {
          newSelectedRows = [selectionIndex];
        }
        if (outerSetSelectedRows) {
          outerSetSelectedRows(newSelectedRows);
        }
        return newSelectedRows;
      });
    },
    [multiple, setSelectedRows, outerSetSelectedRows],
  );

  return [returnFunction];
};
