import * as React from "react";
import {
  clearNotification,
  updateNotificationState,
} from "../../../store/notificationsSlice";
import NodeNotification from "./NodeNotification";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import type { TAlertObj } from "../../../types";

const ListNotifications = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(
    (state) => state?.notificationsSlice?.notifications
  );

  const handleCloseClicked = (alert: TAlertObj): void => {
    dispatch(
      updateNotificationState({
        ...alert,
        open: false,
      })
    );
  };

  const handleAlertExited = (alert: TAlertObj): void => {
    dispatch(
      clearNotification({
        ...alert,
      })
    );
  };

  const handleAlertEntered = (): void => {
    window.scrollTo(0, 0);
  };

  const getNotifications = (): JSX.Element[] => {
    return notifications
      .filter(
        (currentNotification) =>
          ["main", "global"].indexOf(
            currentNotification.importance ?? "main"
          ) !== -1
      )
      .map((alert: TAlertObj) => {
        return (
          <NodeNotification
            key={`alert_${alert.uuid as number}`}
            onCloseClick={handleCloseClicked}
            onEntered={handleAlertEntered}
            onExited={handleAlertExited}
            alert={alert}
          />
        );
      });
  };

  return <>{getNotifications()}</>;
};

export default ListNotifications;
