import { RootState } from "../../app/store";

export const selectHasGeopositionAccess = (state: RootState) =>
  state.weather.hasGeopositionAccess;

export const selectWeatherLoadingState = (state: RootState) =>
  state.weather.loadingState;
