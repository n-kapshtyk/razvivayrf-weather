import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LoadingState, WeatherSliceState } from "./types";

// Define the initial state using that type
const initialState: WeatherSliceState = {
  activeCoords: null,
  hasGeopositionAccess: false,
  loadingState: LoadingState.idle,
  savedPositions: [],
  weatherData: null,
};

export const weatherSlice = createSlice({
  name: "weather",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setGeopositionAccess: (state, action: PayloadAction<boolean>) => {
      state.hasGeopositionAccess = action.payload;
    },
  },
});

export const { setGeopositionAccess } = weatherSlice.actions;

export default weatherSlice.reducer;
