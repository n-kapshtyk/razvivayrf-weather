import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectWeatherData } from "../../features/weather/selectors";
import { locales, weatherConditionsLocales } from "../../locales";
import { WeatherDetailInfoHeader } from "./WeatherDetailInfoHeader";

export function WeatherDetailInfo() {
  const wheatherData = useAppSelector(selectWeatherData);

  if (!wheatherData) {
    return null;
  }

  const { fact, info, geo_object, now_dt } = wheatherData;

  return (
    <div className="flex flex-col">
      <WeatherDetailInfoHeader />
      <ul className="text-base md:text-lg">
        <WeatherDetailInfoItem
          name={locales.weather.info.place}
          value={`${geo_object.country.name}, ${geo_object.locality.name}`}
        />
        <WeatherDetailInfoItem
          name={locales.weather.info.coords}
          value={`${info.lat} / ${info.lon}`}
        />
        <WeatherDetailInfoItem
          name={locales.weather.info.time}
          value={`${new Intl.DateTimeFormat("ru", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date(now_dt))}`}
        />
        <WeatherDetailInfoItem
          name={locales.weather.info.temp}
          value={`${fact.temp}℃`}
        />
        <WeatherDetailInfoItem
          name={locales.weather.info.tempFeels}
          value={`${fact.feels_like}℃`}
        />
        <WeatherDetailInfoItem
          name={locales.weather.info.condition}
          value={`${weatherConditionsLocales[fact.condition]}`}
        />
        <WeatherDetailInfoItem
          name={locales.weather.info.windSpeed}
          value={`${fact.wind_speed}м/c`}
        />
        <WeatherDetailInfoItem
          name={locales.weather.info.pressure}
          value={`${fact.pressure_mm}мм рт.ст.`}
        />
        <WeatherDetailInfoItem
          name={locales.weather.info.humidity}
          value={`${fact.humidity}%`}
        />
      </ul>
    </div>
  );
}

interface WeatherDetailInfoItemProps {
  name: string;
  value: string;
}

function WeatherDetailInfoItem({ name, value }: WeatherDetailInfoItemProps) {
  return (
    <li className="flex items-center space-x-2">
      <span className="font-medium">{name}:</span>
      <span>{value}</span>
    </li>
  );
}
