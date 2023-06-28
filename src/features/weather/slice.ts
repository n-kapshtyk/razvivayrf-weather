import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LoadingState, WeatherSliceState } from "./types";
import { fetchWeatherByCoords } from "./api";

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
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherByCoords.pending, (state, action) => {
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
    });
  },
});

export const { setGeopositionAccess } = weatherSlice.actions;

export default weatherSlice.reducer;
