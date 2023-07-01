import React from "react";
import { WeatherDataForecast } from "../../features/weather/types";

interface WeatherDetailDayInfoProps {
  forecast: WeatherDataForecast;
}

export function WeatherDetailDayInfo({ forecast }: WeatherDetailDayInfoProps) {
  return (
    <div>
      {JSON.stringify(forecast)}
      i. Минимальную температуру ii. Максимальную температуру iii. Среднюю
      температуру за день iv. Температура (ощущается) v. Дату vi.
      Описание(солнечно, ветрено и т.д.) vii. Скорость ветра viii. Атмосферное
      давление ix. Влажность
    </div>
  );
}
