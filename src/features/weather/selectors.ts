import { RootState } from "../../app/store";

export const selectHasGeopositionAccess = (state: RootState) =>
  state.weather.hasGeopositionAccess;
