import React from "react";
import { WeatherDataForecast } from "../../features/weather/types";
import { weatherConditionsLocales } from "../../locales";

interface WeatherDetailDayInfoProps {
  forecast: WeatherDataForecast;
}

export function WeatherDetailDayInfo({ forecast }: WeatherDetailDayInfoProps) {
  console.log("forecast", forecast);
  const dayInfo = forecast.parts["day"];
  return (
    <div>
      <WeatherDetailDayInfoItem
        name="Минимальная температура"
        value={`${dayInfo.temp_min}℃`}
      />
      <WeatherDetailDayInfoItem
        name="Максимальная температура"
        value={`${dayInfo.temp_max}℃`}
      />
      <WeatherDetailDayInfoItem
        name="Cредняя температура"
        value={`${dayInfo.temp_avg}℃`}
      />
      <WeatherDetailDayInfoItem
        name="Температура (ощущается)"
        value={`${dayInfo.feels_like}℃`}
      />{" "}
      <WeatherDetailDayInfoItem
        name="Описание"
        value={`${weatherConditionsLocales[dayInfo.condition]}`}
      />
      <WeatherDetailDayInfoItem
        name="Скорость ветра"
        value={`${dayInfo.wind_speed}м/c`}
      />
      <WeatherDetailDayInfoItem
        name="Атмосферное давление"
        value={`${dayInfo.pressure_mm}мм рт.ст.`}
      />
      <WeatherDetailDayInfoItem
        name="Влажность"
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
