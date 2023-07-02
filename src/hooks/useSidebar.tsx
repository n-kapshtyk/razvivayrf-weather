import { useCallback, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectActivePosition,
  selectCurrentUserPosition,
  selectSavedPositions,
} from "../features/weather/selectors";
import { setActivePosition } from "../features/weather/slice";
import { fetchWeatherByCoords } from "../features/weather/api";
import { locales } from "../locales";
import {
  PositionCoords,
  SavedWeatherPosition,
} from "../features/weather/types";
import { getIsNoSavedPosition, getIsSavedPosition } from "../utils/helpers";

export function useSidebar() {
  const dispatch = useAppDispatch();

  const currentUserPosition = useAppSelector(selectCurrentUserPosition);
  const activePosition = useAppSelector(selectActivePosition);
  const savedPositions = useAppSelector(selectSavedPositions);

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  const setCurrentPositionAsActive = useCallback(() => {
    if (currentUserPosition) {
      dispatch(setActivePosition(currentUserPosition));
      dispatch(fetchWeatherByCoords(currentUserPosition));
    }
  }, [currentUserPosition, dispatch]);

  const menuItems = useMemo(() => {
    const savedList = getSavedMenuItems({
      savedPositions,
      onItemClick: (position) => {
        dispatch(setActivePosition(position));
        dispatch(
          fetchWeatherByCoords({
            lat: position.coords.lat,
            lon: position.coords.lon,
          })
        );
      },
    });

    const activeSearchPosition = getActiveSearchMenuItem({
      activePosition,
      currentUserPosition,
    });

    return [
      {
        key: "current",
        label: locales.myPositionMenuItem,
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

  const activeId = useMemo(() => {
    if (getIsSavedPosition(activePosition)) {
      return activePosition.id;
    }
    if (
      getIsNoSavedPosition(activePosition) &&
      activePosition.lat !== currentUserPosition?.lat &&
      activePosition.lon !== currentUserPosition?.lon
    ) {
      return `${activePosition.lat}${activePosition.lon}`;
    }
    return "current";
  }, [activePosition, currentUserPosition]);

  return {
    activeId,
    isOpenAddModal,
    setIsOpenAddModal,
    menuItems,
  };
}

interface GetSavedMenuItemsProps {
  savedPositions: SavedWeatherPosition[];
  onItemClick: (position: SavedWeatherPosition) => void;
}

function getSavedMenuItems({
  onItemClick,
  savedPositions,
}: GetSavedMenuItemsProps) {
  if (savedPositions.length === 0) {
    return [];
  }
  return [
    {
      key: "saved",
      label: locales.savedMenuItems,
      type: "group",
    },
    ...savedPositions.map((position) => ({
      key: String(position.id),
      label: position.name,
      onClick: () => {
        onItemClick(position);
      },
    })),
  ];
}

interface GetActiveSearchMenuItemProps {
  activePosition: SavedWeatherPosition | PositionCoords | null;
  currentUserPosition: PositionCoords | null;
}

function getActiveSearchMenuItem({
  activePosition,
  currentUserPosition,
}: GetActiveSearchMenuItemProps) {
  if (
    !activePosition ||
    !getIsNoSavedPosition(activePosition) ||
    !currentUserPosition
  ) {
    return [];
  }
  return activePosition.lat !== currentUserPosition?.lat &&
    activePosition.lon !== currentUserPosition?.lon
    ? [
        {
          key: `${activePosition.lat}${activePosition.lon}`,
          label: `${activePosition.lat} / ${activePosition.lon}`,
        },
      ]
    : [];
}
