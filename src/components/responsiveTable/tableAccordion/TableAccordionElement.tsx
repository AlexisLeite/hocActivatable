/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/** @jsxImportSource theme-ui */
import * as React from 'react';
import { FaPlus, FaMinus } from '@meronex/icons/fa';
import { useTraceUpdate } from '../../../../utils/util/utils';

const ExpandedIcons = React.memo(({ collapsed }: { collapsed: boolean }) => {
  if (collapsed) {
    return (
      <FaPlus
        className="expandIcon"
        sx={{
          ml: '4',
        }}
      />
    );
  }
  return (
    <FaMinus
      className="collapseIcon"
      sx={{
        ml: '4',
      }}
    />
  );
});

export interface ITableAccordionElement {
  title: string;
  renderTitle?: React.ReactNode;
  id: string | number;
  children: React.ReactNode;
  onToggle?: (event: React.MouseEvent<HTMLElement>) => void;
  onSelect?: (event: React.MouseEvent<HTMLElement>) => void;
  collapsed?: boolean;
  className?: string;
  locked?: boolean;
  rowIndex: number;
}

ExpandedIcons.displayName = 'Expanded Icons';

const TableAccordionElement = React.memo(
  React.forwardRef<HTMLElement, ITableAccordionElement>(
    (
      {
        collapsed = false,
        title,
        id,
        children,
        renderTitle,
        onToggle,
        onSelect,
        className,
        locked,
        rowIndex,
      }: ITableAccordionElement,
      outerRef,
    ): JSX.Element => {
      const [state, setState] = React.useState({
        expanded: false,
        contentHeight: 0,
      });
      const ref = React.useRef<HTMLDivElement>(null);

      console.log('render');
      useTraceUpdate({
        collapsed,
        title,
        id,
        children,
        renderTitle,
        onToggle,
        onSelect,
        className,
        locked,
        rowIndex,
      });

      React.useEffect(() => {
        let newHeight;
        if (!collapsed && ref.current) newHeight = ref.current.offsetHeight;
        else newHeight = 0;
        setState({ ...state, contentHeight: newHeight });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [collapsed]);

      React.useEffect(() => {
        let newHeight;
        if (!collapsed && ref.current?.getBoundingClientRect().height)
          newHeight = ref.current?.getBoundingClientRect().height;
        else newHeight = 0;
        setState({ ...state, contentHeight: newHeight });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [collapsed]);

      return (
        <article
          aria-label={title}
          ref={outerRef}
          className={`accordionElement ${className ?? ''} ${
            locked ? 'locked' : ''
          }`}
        >
          <button
            type="button"
            title={title}
            id={`section_${id}`}
            aria-expanded={!collapsed}
            aria-controls={`panel_${id}`}
            data-row-index={rowIndex}
            onClick={onToggle}
            className="toggleElement"
            tabIndex={-1}
          >
            {renderTitle || title}
            <ExpandedIcons collapsed={collapsed} />
          </button>
          <div
            role="button"
            tabIndex={-1}
            data-row-index={id}
            onClick={onSelect}
            sx={{
              height: `${state.contentHeight}px`,
            }}
            className="content"
          >
            <div
              sx={{
                p: 3,
              }}
              ref={ref}
            >
              {children}
            </div>
          </div>
        </article>
      );
    },
  ),
);

TableAccordionElement.displayName = 'TableAccordionElement';

export default TableAccordionElement;
