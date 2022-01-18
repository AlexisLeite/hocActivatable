/** @jsxImportSource theme-ui */
import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import useScrollLock from "use-scroll-lock";
import { CSSTransition } from "react-transition-group";
import Overlay from "../Overlay";
import DialogHeader from "./DialogHeader";
import NodeNotification from "../alert/NodeNotification";
import type { TModalSize, TAlertObj } from "../../../types";
import { useAppDispatch } from "../../../hooks/hooks";
import { clearNotification } from "../../../store/notificationsSlice";

export interface IModal {
  open?: boolean;
  title?: string;
  children?: React.ReactNode;
  noHeader?: boolean;
  size?: TModalSize;
  shouldCloseOnOverlayClick?: boolean;
  shouldCloseOnEsc?: boolean;
  alert?: TAlertObj;
  onClose?: () => void;
  onExited?: () => void;
  onAlertClose?: () => void;
  onAlertExited?: () => void;
  className?: string;
  NavBar?: JSX.Element;
  stretch?: boolean;
  id?: string;
}

const Modal = ({
  open = false,
  title = "",
  children = null,
  noHeader = false,
  size = "md",
  shouldCloseOnEsc = true,
  shouldCloseOnOverlayClick = true,
  alert = {
    message: "",
    type: "sysMessage",
    open: false,
  },
  onExited = () => {},
  onAlertClose = () => {},
  onAlertExited = () => {},
  onClose = () => {},
  NavBar,
  className,
  stretch,
  id,
}: IModal): JSX.Element => {
  const [isOpen, setIsOpen] = useState(open);
  const TRANSITION_DURATION = 600;
  useScrollLock(isOpen);
  // predefined sizes
  /* const MODAL_SIZES = {
    sm: '350px',
    md: '500px',
    lg: '640px',
    xl: '730px',
    xxl: '860px',
    xxxl: '90vh',
  }; */

  const closeHandler = useCallback(() => {
    setIsOpen(false);
    onClose();
  }, [onClose]);

  const overlayClickedHandle = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldCloseOnOverlayClick) {
      if (
        (event.target as HTMLDivElement).getAttribute("data-type") === "overlay"
      ) {
        closeHandler();
      }
    }
  };

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        console.log(title);
        event.preventDefault();
        event.stopPropagation();
        closeHandler();
      }
    },
    [closeHandler, title]
  );

  useEffect(() => {
    // set root to aria-hidden while modal is visible
    if (open === true) {
      const root = document.getElementById("root");
      if (root) {
        root.setAttribute("aria-hidden", "true");
      }
    } else if (!open) {
      const root = document.getElementById("root");
      if (root) {
        root.setAttribute("aria-hidden", "false");
      }
      // modal hook already provides restore focus
      // const restoreFocusOnElement = document.activeElement;
    }
  }, [open]);

  useEffect(() => {
    if (isOpen && shouldCloseOnEsc)
      document.addEventListener("keydown", handleEscape, false);
    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [shouldCloseOnEsc, handleEscape, isOpen]);

  const dispatch = useAppDispatch();
  return (
    <Overlay
      onOverlayClicked={overlayClickedHandle}
      onExited={onExited}
      open={open}
      className={className}
      stretch={stretch}
    >
      <CSSTransition
        in={open}
        timeout={TRANSITION_DURATION}
        onExited={onExited}
        classNames="modal"
        appear
        unmountOnExit
      >
        <div
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          aria-hidden="false"
          // allows scrolling within element, despite body lock
          data-scroll-lock-scrollable
          sx={{
            variant: `layout.modal-${size}`,
          }}
          className="modalMain"
          id={id ? `Modal-${id}` : ""}
        >
          <NodeNotification
            className="modalNotifications"
            onCloseClick={onAlertClose}
            alert={alert}
            onExited={() => {
              dispatch(
                clearNotification({
                  ...alert,
                })
              );
              onAlertExited();
            }}
          />
          {!noHeader && (
            <DialogHeader
              className="modalHeader"
              NavBar={NavBar}
              title={title}
              close={closeHandler}
              id={id}
            />
          )}
          <div className="modalContent">{children}</div>
        </div>
      </CSSTransition>
    </Overlay>
  );
};

export default Modal;
