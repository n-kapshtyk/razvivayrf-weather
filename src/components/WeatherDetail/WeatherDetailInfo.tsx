import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectWeatherData } from "../../features/weather/selectors";
import { Button } from "antd";
import { SavePositionModal } from "../Modals/SavePositionModal";
import { weatherConditionsLocales } from "../../locales";

export function WeatherDetailInfo() {
  const [isOpenSaveModal, setIsOpenSaveModal] = useState(false);
  const wheatherData = useAppSelector(selectWeatherData);

  if (!wheatherData) {
    return null;
  }
  const { fact, info, geo_object, now_dt } = wheatherData;

  const positionName = `${geo_object.country.name}, ${geo_object.locality.name}`;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold">{positionName}</h2>
        <Button onClick={() => setIsOpenSaveModal(true)}>
          Сохранить текущую позицию
        </Button>
      </div>
      {isOpenSaveModal && (
        <SavePositionModal
          initialName={positionName}
          setIsOpenSaveModal={setIsOpenSaveModal}
        />
      )}
      <ul className="text-lg">
        <WeatherDetailInfoItem
          name="Широта и долгота"
          value={`${info.lat} / ${info.lon}`}
        />
        <WeatherDetailInfoItem
          name="Местное время"
          value={`${new Intl.DateTimeFormat("ru", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date(now_dt))}`}
        />
        <WeatherDetailInfoItem name="Температура" value={`${fact.temp}℃`} />
        <WeatherDetailInfoItem
          name="Температура (ощущается)"
          value={`${fact.feels_like}℃`}
        />
        <WeatherDetailInfoItem
          name="Описание"
          value={`${weatherConditionsLocales[fact.condition]}`}
        />
        <WeatherDetailInfoItem
          name="Скорость ветра"
          value={`${fact.wind_speed}м/c`}
        />
        <WeatherDetailInfoItem
          name="Атмосферное давление"
          value={`${fact.pressure_mm}мм рт.ст.`}
        />
        <WeatherDetailInfoItem name="Влажность" value={`${fact.humidity}%`} />
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
