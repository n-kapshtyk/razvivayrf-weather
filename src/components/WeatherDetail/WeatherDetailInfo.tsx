import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectActivePosition,
  selectCurrentUserPosition,
  selectWeatherData,
} from "../../features/weather/selectors";
import { Button } from "antd";
import { SavePositionModal } from "../Modals/SavePositionModal";
import { weatherConditionsLocales } from "../../locales";
import {
  removeSavedPosition,
  setActivePosition,
} from "../../features/weather/slice";

export function WeatherDetailInfo() {
  const [isOpenSaveModal, setIsOpenSaveModal] = useState(false);
  const dispatch = useAppDispatch();
  const wheatherData = useAppSelector(selectWeatherData);
  const activePosition = useAppSelector(selectActivePosition);
  const currentUserPosition = useAppSelector(selectCurrentUserPosition);

  if (!wheatherData) {
    return null;
  }
  const { fact, info, geo_object, now_dt } = wheatherData;

  const isSaved = activePosition && "name" in activePosition;

  console.log("activePosition", activePosition);
  const positionName = `${
    isSaved
      ? activePosition.name
      : `${activePosition?.lat} / ${activePosition?.lon}`
  }`;

  const removeSavedHandler = () => {
    if (!isSaved) {
      return;
    }
    dispatch(removeSavedPosition(activePosition));
    dispatch(setActivePosition(currentUserPosition));
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between pb-6">
        <h2 className="text-2xl font-extrabold">{positionName}</h2>
        <div className="flex items-center">
          {isSaved && (
            <Button danger={true} onClick={removeSavedHandler} className="mr-2">
              Удалить
            </Button>
          )}
          <Button onClick={() => setIsOpenSaveModal(true)}>
            {isSaved ? "Изменить" : "Сохранить"}
          </Button>
        </div>
      </div>
      {isOpenSaveModal && (
        <SavePositionModal
          initialName={positionName}
          setIsOpenSaveModal={setIsOpenSaveModal}
        />
      )}
      <ul className="text-lg">
        <WeatherDetailInfoItem
          name="Место"
          value={`${geo_object.country.name}, ${geo_object.locality.name}`}
        />
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
