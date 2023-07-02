import { Tabs } from "antd";
import React, { useMemo } from "react";
import type { TabsProps } from "antd";
import { useAppSelector } from "../../app/hooks";
import { selectWeatherData } from "../../features/weather/selectors";
import { WeatherDetailDayInfo } from "./WeatherDetailDayInfo";

export function WeatherDetailDays() {
  const weatherData = useAppSelector(selectWeatherData);

  const items: TabsProps["items"] = useMemo(() => {
    if (!weatherData) {
      return [];
    }
    return weatherData.forecasts.map((forecast) => ({
      key: forecast.date,
      label: forecast.date,
      children: <WeatherDetailDayInfo forecast={forecast} />,
    }));
  }, [weatherData]);

  return <Tabs defaultActiveKey={items[0].key} items={items} />;
}
