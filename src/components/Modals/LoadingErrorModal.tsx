import { Modal } from "antd";
import React, { useState } from "react";
import { locales } from "../../locales";

export function LoadingErrorModal() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Modal
      title={locales.loadingErrorModal.title}
      open={isOpen}
      centered={true}
      cancelButtonProps={{
        className: "!hidden",
      }}
      okButtonProps={{
        className: "!hidden",
      }}
      closable={true}
      onCancel={() => setIsOpen(false)}
    >
      <p>{locales.loadingErrorModal.text}</p>
    </Modal>
  );
}
