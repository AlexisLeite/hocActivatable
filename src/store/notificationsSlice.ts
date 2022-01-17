import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TAlertObj } from '../types';

export interface INotificationsState {
  notifications: TAlertObj[];
  currentIndex: number;
}

export const removeNotification = (
  notifications: TAlertObj[],
  deleteNotification: TAlertObj,
): TAlertObj[] => {
  const filteredArr = notifications.filter(
    (el) => el.uuid !== deleteNotification.uuid,
  );
  return filteredArr || [];
};

export const addNotification = (
  notifications: TAlertObj[],
  newNotification: TAlertObj,
): TAlertObj[] => {
  const filteredArr = notifications.filter(
    (el) => el.uuid !== newNotification.uuid,
  );
  filteredArr.unshift(newNotification);
  return filteredArr || [];
};

export const updateNotification = (
  notifications: TAlertObj[],
  updatedNotification: TAlertObj,
): TAlertObj[] => {
  // Find index of updatedNotification.
  const objIndex = notifications.findIndex(
    (obj) => obj.uuid === updatedNotification.uuid,
  );
  // clone and filter array of the updated notif.
  const filteredArr = notifications.filter(
    (el) => el.uuid !== updatedNotification.uuid,
  );
  // add updated notification in its original place in the array
  filteredArr.splice(objIndex, 0, updatedNotification);
  return filteredArr;
};

const notificationsSlice = createSlice({
  name: 'notificationsSlice',
  initialState: {
    notifications: [],
    currentIndex: 0,
  } as INotificationsState,
  reducers: {
    setNotification: (state, action: PayloadAction<TAlertObj>) => {
      state.notifications = addNotification(state.notifications, {
        ...action.payload,
        uuid: parseInt(`${state.currentIndex}`, 10),
      });
      state.currentIndex += 1;
    },
    clearNotification: (state, action: PayloadAction<TAlertObj>) => {
      state.notifications = removeNotification(
        state.notifications,
        action.payload,
      );
    },
    updateNotificationState: (state, action: PayloadAction<TAlertObj>) => {
      state.notifications = updateNotification(
        state.notifications,
        action.payload,
      );
    },
  },
});
export default notificationsSlice.reducer;
export const { setNotification, clearNotification, updateNotificationState } =
  notificationsSlice.actions;
