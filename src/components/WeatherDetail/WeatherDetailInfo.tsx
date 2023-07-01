import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectWeatherData } from "../../features/weather/selectors";
import { Button } from "antd";

export function WeatherDetailInfo() {
  const wheatherData = useAppSelector(selectWeatherData);

  if (!wheatherData) {
    return null;
  }

  const { info, geo_object } = wheatherData;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold">
          {geo_object.country.name}, {geo_object.locality.name}
        </h2>
        <Button>Сохранить текущую позицию</Button>
      </div>
      <ul className="text-lg">
        <li className="flex items-center space-x-2">
          <span className="font-medium">Широта и долгота:</span>
          <span>
            {info.lat} - {info.lon}
          </span>
        </li>
        i. ii. Название местности iii. Местное время iv. Температура v.
        Температура (ощущается) vi. Описание (солнечно, ветрено и т.д.) vii.
        Скорость ветра viii. Атмосферное давление ix. Влажность
      </ul>
    </div>
  );
}
