import { Button } from "antd";
import React, { useState } from "react";
import { locales } from "../../locales";
import { SavePositionModal } from "../Modals/SavePositionModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectActivePosition,
  selectCurrentUserPosition,
} from "../../features/weather/selectors";
import { formatCoordsToName, getIsSavedPosition } from "../../utils/helpers";
import {
  removeSavedPosition,
  setActivePosition,
} from "../../features/weather/slice";

export function WeatherDetailInfoHeader() {
  const [isOpenSaveModal, setIsOpenSaveModal] = useState(false);
  const dispatch = useAppDispatch();
  const activePosition = useAppSelector(selectActivePosition);
  const currentUserPosition = useAppSelector(selectCurrentUserPosition);

  const isSaved = getIsSavedPosition(activePosition);

  const positionName = isSaved
    ? activePosition.name
    : formatCoordsToName(activePosition);

  const removeSavedHandler = () => {
    if (!isSaved) {
      return;
    }
    dispatch(removeSavedPosition(activePosition));
    dispatch(setActivePosition(currentUserPosition));
  };

  return (
    <>
      <div className="flex items-center justify-between pb-6">
        <h2 className="text-lg sm:text-2xl font-extrabold">{positionName}</h2>
        <div className="flex items-center">
          {isSaved && (
            <Button danger={true} onClick={removeSavedHandler} className="mr-2">
              {locales.weather.buttons.remove}
            </Button>
          )}
          <Button onClick={() => setIsOpenSaveModal(true)}>
            {isSaved
              ? locales.weather.buttons.update
              : locales.weather.buttons.save}
          </Button>
        </div>
      </div>
      {isOpenSaveModal && (
        <SavePositionModal
          initialName={positionName}
          setIsOpenSaveModal={setIsOpenSaveModal}
        />
      )}
    </>
  );
}
