/** @jsxImportSource theme-ui */
import * as React from "react";
import FocusTrap from "focus-trap-react";
import { CSSTransition } from "react-transition-group";

export interface IOverlay {
  opacity?: number;
  open?: boolean;
  children: React.ReactNode;
  onOverlayClicked: (event: React.MouseEvent<HTMLDivElement>) => void;
  onExited: () => void;
  className?: string;
  stretch?: boolean;
}

const Overlay = ({
  open = false,
  onOverlayClicked,
  children,
  onExited,
  className = "",
  stretch,
}: IOverlay): JSX.Element => {
  const TRANSITION_DURATION = 500;
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <CSSTransition
      in={open}
      timeout={TRANSITION_DURATION}
      onExited={onExited}
      classNames="overlay"
      appear
      unmountOnExit
    >
      <FocusTrap>
        <div
          className={`${className} overlay`}
          data-type="overlay"
          role="presentation"
          ref={ref}
          onClick={(ev) => {
            if (ev.target === ref.current) onOverlayClicked(ev);
          }}
          sx={{
            variant: `layout.overlay${stretch ? "-stretch" : ""}`,
          }}
        >
          {children}
        </div>
      </FocusTrap>
    </CSSTransition>
  );
};

export default Overlay;
