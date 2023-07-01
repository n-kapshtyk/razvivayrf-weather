import { useCallback, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectActivePosition,
  selectCurrentUserPosition,
} from "../features/weather/selectors";
import { setActivePosition } from "../features/weather/slice";

export function useSidebar() {
  const dispatch = useAppDispatch();

  const currentUserPosition = useAppSelector(selectCurrentUserPosition);
  const activePosition = useAppSelector(selectActivePosition);

  const activeId = useMemo(() => {
    return !!activePosition && "id" in activePosition
      ? activePosition.id
      : "current";
  }, [activePosition]);

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  const setCurrentPositionAsActive = useCallback(() => {
    dispatch(setActivePosition(currentUserPosition));
  }, [currentUserPosition, dispatch]);

  return {
    activeId,
    isOpenAddModal,
    setIsOpenAddModal,
    setCurrentPositionAsActive,
  };
}
