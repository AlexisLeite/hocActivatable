import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import {
  clearNotification,
  setNotification,
} from "../store/notificationsSlice";
import type { TAlertImportance, TAlertObj } from "../types";
import store from "../store";
import Config from "../components/config";

export type TMessage = {
  text: string;
  label?: string;
};

export type TNotificationMessage = {
  onClose?: string;
  sysMessages?: {
    message: TMessage | TMessage[];
  };
  sysExceptions?: {
    exception: TMessage | TMessage[];
  };
  exceptions?: {
    exception: TMessage | TMessage[];
  };
};

let lastWindowIndex = 0;
export const getWindowIndex = () => {
  lastWindowIndex += 1;
  return lastWindowIndex;
};

export const dispatchNotification = (
  alert: TNotificationMessage,
  {
    importance,
    windowIndex,
  }: { importance?: TAlertImportance; windowIndex?: number } = {
    importance: "main",
    windowIndex: -1,
  }
) => {
  let messageObj;
  let messageType;
  let message;
  if (alert) {
    if (alert.sysMessages) {
      messageObj = alert.sysMessages;
      messageType = Config.SYS_MESSAGE;
      message = messageObj.message;
    } else if (alert.sysExceptions) {
      messageObj = alert.sysExceptions;
      messageType = Config.SYS_EXCEPTION;
      message = messageObj.exception;
    } else if (alert.exceptions) {
      messageObj = alert.exceptions;
      messageType = Config.EXCEPTION;
      message = messageObj.exception;
    }
    let notification = "";
    if (Array.isArray(message)) {
      if (message) {
        for (let i = 0; i < message.length; i += 1) {
          notification += `${message[i].text || message[i].label || ""}<br>`;
        }
      }
    } else if (message) {
      notification = message.text || message.label || "";
    }

    if (notification) {
      store.dispatch(
        setNotification({
          message: notification,
          type: messageType,
          open: true,
          importance,
          windowIndex,
        } as TAlertObj)
      );
    }
  }
};

const useNotifications = (): [
  React.Dispatch<React.SetStateAction<TNotificationMessage>>
] => {
  const dispatch = useAppDispatch();
  const [alert, setAlert] = useState<TNotificationMessage>({});

  useEffect(() => dispatchNotification(alert), [alert, dispatch]);

  return [setAlert];
};

export type TModalError = Pick<TAlertObj, "message" | "open" | "type">;
export function useModalError(
  windowIndex = -1
): [
  TAlertObj,
  (newError: Pick<TModalError, "message" | "type">) => void,
  () => void
] {
  const [error, innerSetError] = useState<TAlertObj>({
    message: "",
    open: false,
    type: "",
  });

  const dispatch = useAppDispatch();
  const notifications = useAppSelector(
    (state) => state.notificationsSlice.notifications
  );

  useEffect(() => {
    notifications.forEach((notification) => {
      if (
        notification.open &&
        ((notification.importance === "modal" &&
          notification.windowIndex === windowIndex) ||
          notification.importance === "global")
      )
        innerSetError(notification);
    });
  }, [notifications, windowIndex]);

  const outerSetError = (newError: Pick<TModalError, "message" | "type">) => {
    dispatch(
      setNotification({
        ...newError,
        open: true,
        windowIndex,
        importance: "modal",
      })
    );
  };

  const closeError = () => {
    dispatch(clearNotification(error));
    innerSetError({
      open: false,
      message: "",
      type: "sysMessage",
    });
  };

  return [error, outerSetError, closeError];
}

export function useCustomNotification() {
  const dispatch = useAppDispatch();
  const [notification, setStateNotification] = useState<TAlertObj>();

  useEffect(() => {
    /* 
    if (notification) dispatch(setNotification(notification)); */
  }, [notification, dispatch]);

  const outerSetNotification = React.useCallback(
    (newNotification: Omit<TAlertObj, "open">) => {
      setStateNotification({
        ...newNotification,
        open: true,
      });
    },
    []
  );

  return [outerSetNotification];
}

export default useNotifications;
