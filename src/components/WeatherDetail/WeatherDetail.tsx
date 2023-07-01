import React from "react";
import { WeatherDetailInfo } from "./WeatherDetailInfo";
import { WeatherDetailDays } from "./WeatherDetailDays";
import { useAppSelector } from "../../app/hooks";
import { selectWeatherLoadingState } from "../../features/weather/selectors";
import { LoadingState } from "../../features/weather/types";
import { LoadingErrorModal } from "../Modals/LoadingErrorModal";
import { LoadingScreen } from "../LoadingScreen";

export function WeatherDetail() {
  const loadingState = useAppSelector(selectWeatherLoadingState);

  if (loadingState === LoadingState.loading) {
    return <LoadingScreen />;
  }

  if (loadingState === LoadingState.error) {
    return <LoadingErrorModal />;
  }

  return (
    <div className="flex flex-col">
      <WeatherDetailInfo />
      <WeatherDetailDays />
    </div>
  );
}
