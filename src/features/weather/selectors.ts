import { RootState } from "../../app/store";

export const selectHasGeopositionAccess = (state: RootState) =>
  state.weather.hasGeopositionAccess;

export const selectWeatherLoadingState = (state: RootState) =>
  state.weather.loadingState;

export const selectWeatherData = (state: RootState) =>
  state.weather.weatherData;

export const selectActivePosition = (state: RootState) =>
  state.weather.activePosition;

export const selectCurrentUserPosition = (state: RootState) =>
  state.weather.currentUserPosition;

export const selectSavedPositions = (state: RootState) =>
  state.weather.savedPositions;
