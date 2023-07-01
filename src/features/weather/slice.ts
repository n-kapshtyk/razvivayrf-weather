import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  LoadingState,
  PositionCoords,
  SavedWeatherPosition,
  WeatherSliceState,
} from "./types";
import { fetchWeatherByCoords } from "./api";

const initialState: WeatherSliceState = {
  activePosition: null,
  currentUserPosition: null,
  hasGeopositionAccess: false,
  loadingState: LoadingState.idle,
  savedPositions: [],
  weatherData: null,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setGeopositionAccess: (state, action: PayloadAction<boolean>) => {
      state.hasGeopositionAccess = action.payload;
    },
    setActivePosition: (
      state,
      action: PayloadAction<SavedWeatherPosition | PositionCoords | null>
    ) => {
      state.activePosition = action.payload;
    },
    setCurrentPosition: (
      state,
      action: PayloadAction<PositionCoords | null>
    ) => {
      state.currentUserPosition = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherByCoords.pending, (state) => {
      state.loadingState = LoadingState.loading;
    });
    builder.addCase(fetchWeatherByCoords.fulfilled, (state, action) => {
      state.loadingState = LoadingState.success;
      state.weatherData = action.payload;
    });
    builder.addCase(fetchWeatherByCoords.rejected, (state) => {
      state.loadingState = LoadingState.error;
    });
  },
});

export const { setGeopositionAccess, setActivePosition, setCurrentPosition } =
  weatherSlice.actions;

export default weatherSlice.reducer;
