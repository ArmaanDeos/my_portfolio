import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import forgotResetPasswordSlice from "./reducers/forgotResetPasswordSlice";
import messageSlice from "./reducers/messageSlice";
import timelineSlice from "./reducers/timelineSlice";
import skillSlice from "./reducers/skillSlice";
import applicationSlice from "./reducers/applicationSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducers = combineReducers({
  user: userReducer,
  forgotPassword: forgotResetPasswordSlice,
  messages: messageSlice,
  timeline: timelineSlice,
  skill: skillSlice,
  application: applicationSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
