import React from "react";
import { WeatherDetailInfo } from "./WeatherDetailInfo";
import { WeatherDetailDays } from "./WeatherDetailDays";
import { Layout, Spin } from "antd";
import { useAppSelector } from "../../app/hooks";
import { selectWeatherLoadingState } from "../../features/weather/selectors";
import { LoadingState } from "../../features/weather/types";
import { LoadingErrorModal } from "../Modals/LoadingErrorModal";
import { LoadingScreen } from "../LoadingScreen";

const { Content } = Layout;

export function WeatherDetail() {
  const loadingState = useAppSelector(selectWeatherLoadingState);
  return (
    <Layout className="h-screen">
      <Content className="p-6">
        {loadingState === LoadingState.loading && <LoadingScreen />}
        {loadingState === LoadingState.error && <LoadingErrorModal />}
        {loadingState == LoadingState.success && (
          <div className="flex flex-col">
            <WeatherDetailInfo />
            <WeatherDetailDays />
          </div>
        )}
      </Content>
    </Layout>
  );
}
