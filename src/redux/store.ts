import { configureStore } from "@reduxjs/toolkit";
import offCanvasSlice from "./features/ui/offCanvas/offCanvasSlice";
import { baseAPI } from "./api/baseApi";


export const store = () => {
  return configureStore({
    reducer: {
      [baseAPI.reducerPath]: baseAPI.reducer,
      offCanvas: offCanvasSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat([baseAPI.middleware]),
  });
}

// Infer the type of the store
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
