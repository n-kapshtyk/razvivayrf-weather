import { useEffect, useState } from "react";
import {
  setActivePosition,
  setCurrentPosition,
  setGeopositionAccess,
} from "../features/weather/slice";
import { fetchWeatherByCoords } from "../features/weather/api";
import { useAppDispatch } from "../app/hooks";

export function usePositionInitialize() {
  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        dispatch(setGeopositionAccess(true));
        dispatch(setActivePosition(coords));
        dispatch(setCurrentPosition(coords));
        dispatch(fetchWeatherByCoords(coords));
        setIsInitialized(true);
      },
      () => {
        dispatch(setGeopositionAccess(false));
        dispatch(setActivePosition(null));
        dispatch(setCurrentPosition(null));
        setIsInitialized(true);
      }
    );
  }, [dispatch]);

  return { isInitialized };
}
