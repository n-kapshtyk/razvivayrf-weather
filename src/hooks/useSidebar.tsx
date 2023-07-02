import { useCallback, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectActivePosition,
  selectCurrentUserPosition,
  selectSavedPositions,
} from "../features/weather/selectors";
import { setActivePosition } from "../features/weather/slice";
import { fetchWeatherByCoords } from "../features/weather/api";

export function useSidebar() {
  const dispatch = useAppDispatch();

  const currentUserPosition = useAppSelector(selectCurrentUserPosition);
  const activePosition = useAppSelector(selectActivePosition);
  const savedPositions = useAppSelector(selectSavedPositions);

  //todo
  const activeId = useMemo(() => {
    return !!activePosition && "id" in activePosition
      ? activePosition.id
      : !!activePosition &&
        "lat" in activePosition &&
        activePosition.lat !== currentUserPosition?.lat &&
        activePosition.lon !== currentUserPosition?.lon
      ? `${activePosition.lat}${activePosition.lon}`
      : "current";
  }, [activePosition, currentUserPosition]);

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  const setCurrentPositionAsActive = useCallback(() => {
    dispatch(setActivePosition(currentUserPosition));
  }, [currentUserPosition, dispatch]);

  //todo
  const menuItems = useMemo(() => {
    const savedList =
      savedPositions.length > 0
        ? [
            {
              key: "saved",
              label: "Сохраненные",
              type: "group",
            },
            ...savedPositions.map((position) => ({
              key: String(position.id),
              label: position.name,
              onClick: () => {
                dispatch(setActivePosition(position));
                dispatch(
                  fetchWeatherByCoords({
                    lat: position.coords.lat,
                    lon: position.coords.lon,
                  })
                );
              },
            })),
          ]
        : [];

    const activeSearchPosition =
      !!activePosition &&
      "lat" in activePosition &&
      activePosition.lat !== currentUserPosition?.lat &&
      activePosition.lon !== currentUserPosition?.lon
        ? [
            {
              key: `${activePosition.lat}${activePosition.lon}`,
              label: `${activePosition.lat} / ${activePosition.lon}`,
              onClick: () => {
                dispatch(
                  fetchWeatherByCoords({
                    lat: activePosition.lat,
                    lon: activePosition.lon,
                  })
                );
              },
            },
          ]
        : [];

    return [
      {
        key: "current",
        label: "Мое местоположение",
        onClick: setCurrentPositionAsActive,
      },
      ...activeSearchPosition,
      ...savedList,
    ];
  }, [
    activePosition,
    savedPositions,
    dispatch,
    setCurrentPositionAsActive,
    currentUserPosition,
  ]);

  return {
    activeId,
    isOpenAddModal,
    setIsOpenAddModal,
    menuItems,
  };
}
