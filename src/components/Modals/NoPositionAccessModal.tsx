import { Modal } from "antd";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectHasGeopositionAccess } from "../../features/weather/selectors";
import { locales } from "../../locales";

export function NoPositionAccessModal() {
  const hasAccess = useAppSelector(selectHasGeopositionAccess);

  return (
    <Modal
      title={locales.noPositionAccessModal.title}
      open={!hasAccess}
      centered={true}
      cancelButtonProps={{
        className: "!hidden",
      }}
      okButtonProps={{
        className: "!hidden",
      }}
    >
      <p>{locales.noPositionAccessModal.text}</p>
    </Modal>
  );
}
