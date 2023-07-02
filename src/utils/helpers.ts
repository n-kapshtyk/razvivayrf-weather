import {
  PositionCoords,
  SavedWeatherPosition,
} from "../features/weather/types";

export function getIsSavedPosition(
  position: SavedWeatherPosition | PositionCoords | null
): position is SavedWeatherPosition {
  return !!position && "id" in position;
}

export function getIsNoSavedPosition(
  position: SavedWeatherPosition | PositionCoords | null
): position is PositionCoords {
  return !!position && "lat" in position;
}

export function formatCoordsToName(position: PositionCoords | null) {
  if (!position) {
    return "-";
  }
  return `${String(position.lat).slice(0, 5)} / ${String(position.lon).slice(
    0,
    5
  )}`;
}
