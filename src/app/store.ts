import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { weatherSlice } from "../features/weather/slice";

const weatherConfig = {
  key: "weather",
  storage,
  blacklist: ["activePosition", "weatherData", "loadingState"],
};

const reducer = combineReducers({
  weather: persistReducer(weatherConfig, weatherSlice.reducer),
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
