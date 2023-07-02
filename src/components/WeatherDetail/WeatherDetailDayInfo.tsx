import React from "react";
import { WeatherDataForecast } from "../../features/weather/types";
import { locales, weatherConditionsLocales } from "../../locales";

interface WeatherDetailDayInfoProps {
  forecast: WeatherDataForecast;
}

export function WeatherDetailDayInfo({ forecast }: WeatherDetailDayInfoProps) {
  const dayInfo = forecast.parts["day"];

  return (
    <div>
      <WeatherDetailDayInfoItem
        name={locales.weather.dayInfo.minTemp}
        value={`${dayInfo.temp_min}℃`}
      />
      <WeatherDetailDayInfoItem
        name={locales.weather.dayInfo.maxTemp}
        value={`${dayInfo.temp_max}℃`}
      />
      <WeatherDetailDayInfoItem
        name={locales.weather.dayInfo.avgTemp}
        value={`${dayInfo.temp_avg}℃`}
      />
      <WeatherDetailDayInfoItem
        name={locales.weather.dayInfo.tempFeels}
        value={`${dayInfo.feels_like}℃`}
      />{" "}
      <WeatherDetailDayInfoItem
        name={locales.weather.dayInfo.condition}
        value={`${weatherConditionsLocales[dayInfo.condition]}`}
      />
      <WeatherDetailDayInfoItem
        name={locales.weather.dayInfo.windSpeed}
        value={`${dayInfo.wind_speed}м/c`}
      />
      <WeatherDetailDayInfoItem
        name={locales.weather.dayInfo.pressure}
        value={`${dayInfo.pressure_mm}мм рт.ст.`}
      />
      <WeatherDetailDayInfoItem
        name={locales.weather.dayInfo.humidity}
        value={`${dayInfo.humidity}%`}
      />
    </div>
  );
}

interface WeatherDetailDayInfoItemProps {
  name: string;
  value: string;
}

function WeatherDetailDayInfoItem({
  name,
  value,
}: WeatherDetailDayInfoItemProps) {
  return (
    <li className="text-base space-x-2">
      <span className="font-medium">{name}:</span>
      <span>{value}</span>
    </li>
  );
}
