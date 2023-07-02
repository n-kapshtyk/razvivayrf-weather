import { Modal } from "antd";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectHasGeopositionAccess } from "../../features/weather/selectors";

export function NoPositionAccessModal() {
  const hasAccess = useAppSelector(selectHasGeopositionAccess);

  return (
    <Modal
      title="Нет доступа к Вашей позиции"
      open={!hasAccess}
      centered={true}
      cancelButtonProps={{
        className: "!hidden",
      }}
      okButtonProps={{
        className: "!hidden",
      }}
    >
      <p>
        Нет доступа. Без определения Вашей текущей геопозиции, приложение не
        будет корректно функционировать. Вы можете изменить разрешение в
        настройках Вашего браузера.
      </p>
    </Modal>
  );
}
