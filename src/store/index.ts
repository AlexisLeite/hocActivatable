import { configureStore } from "@reduxjs/toolkit";
// import { createLogger } from 'redux-logger';
import { combineReducers } from "redux";

import notificationsSlice from "./notificationsSlice";
import adminSlice from "./adminSlice";

const reducer = combineReducers({
  notificationsSlice,
  adminSlice,
});
/*
const logger = createLogger({
  collapsed: true,
  duration: true,
  diff: true,
}); */

const store = configureStore({
  reducer,
  /* middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend().concat(logger), */
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
