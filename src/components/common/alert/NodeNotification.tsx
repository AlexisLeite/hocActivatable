import * as React from "react";
import { useRef } from "react";
import { Alert, Close } from "theme-ui";
import { darken } from "@theme-ui/color";
import { CSSTransition } from "react-transition-group";
// import { useFocus } from '../../../hooks';
import { TAlertObj } from "../../../types";

export interface INotification {
  alert?: TAlertObj;
  onExited?: (alert: TAlertObj) => void;
  onEntered?: () => void;
  onCloseClick: (alert: TAlertObj) => void;
  className?: string;
}

const NodeNotification = ({
  onExited = () => {},
  onEntered = () => {},
  onCloseClick,
  alert = {
    message: "",
    type: "",
    open: false,
  },
  className,
}: INotification): JSX.Element => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  // const [setFocus] = useFocus(closeBtnRef);

  React.useEffect(() => {
    // onMount set focus to closeBtnRef
    closeBtnRef.current?.focus();
  }, []);

  const nodeRef = React.useRef(null);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={alert.open}
      classNames="notification"
      className="notification"
      appear
      unmountOnExit
      onExited={() => onExited(alert)}
      onEntered={onEntered}
      addEndListener={(node, done) => {
        node.addEventListener(
          "transitionend",
          () => {
            done();
          },
          false
        );
      }}
    >
      <Alert
        ref={nodeRef}
        role="alert"
        sx={{
          variant: `alerts.${alert.type}`,
        }}
        className={className}
      >
        <div>
          {/* this is bc sometimes a msg might come with html in the server's response */}
          {/* eslint-disable-next-line react/no-danger */}
          <h3 dangerouslySetInnerHTML={{ __html: alert.message }} />
          {alert.stack && <p>{alert.stack}</p>}
        </div>
        <Close
          ref={closeBtnRef}
          onClick={() => onCloseClick(alert)}
          sx={{
            ":hover": {
              color: darken("text", 0.4),
            },
          }}
        />
      </Alert>
    </CSSTransition>
  );
};

export default NodeNotification;
