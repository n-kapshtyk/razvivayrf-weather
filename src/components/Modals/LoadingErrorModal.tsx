import { Modal } from "antd";
import React, { useState } from "react";

export function LoadingErrorModal() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Modal
      title="Ошибка загрузки данных"
      open={isOpen}
      centered={true}
      cancelButtonProps={{
        hidden: true,
      }}
      okButtonProps={{
        hidden: true,
      }}
      closable={true}
      onCancel={() => setIsOpen(false)}
    >
      <p>
        Не удалось загрузить данные по выбранной геопозиции. Пожалуйста,
        попробуйте заново
      </p>
    </Modal>
  );
}