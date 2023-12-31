import { Button, Form, InputNumber, Modal } from "antd";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import { useAppDispatch } from "../../app/hooks";
import { fetchWeatherByCoords } from "../../features/weather/api";
import { PositionCoords } from "../../features/weather/types";
import { setActivePosition } from "../../features/weather/slice";
import { locales } from "../../locales";

interface AddPositionModalProps {
  setIsOpenAddModal: Dispatch<SetStateAction<boolean>>;
}

export function AddPositionModal({ setIsOpenAddModal }: AddPositionModalProps) {
  const dispatch = useAppDispatch();

  const onAddPosition = useCallback(
    (values: PositionCoords) => {
      const coords = {
        lat: values.lat,
        lon: values.lon,
      };
      dispatch(fetchWeatherByCoords(coords));
      setIsOpenAddModal(false);
      dispatch(setActivePosition(coords));
    },
    [dispatch, setIsOpenAddModal]
  );

  return (
    <Modal
      title={locales.addPosition.title}
      open={true}
      closable={true}
      onCancel={() => setIsOpenAddModal(false)}
      centered={true}
      cancelButtonProps={{
        className: "!hidden",
      }}
      okButtonProps={{
        className: "!hidden",
      }}
    >
      <Form
        name="add-position"
        className="w-full"
        onFinish={onAddPosition}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label={locales.addPosition.lat}
          name="lat"
          rules={[{ required: true, message: "" }]}
        >
          <InputNumber<string> stringMode className="!w-full" />
        </Form.Item>
        <Form.Item
          label={locales.addPosition.lon}
          name="lon"
          rules={[{ required: true, message: "" }]}
        >
          <InputNumber<string> stringMode className="!w-full" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          {locales.addPosition.button}
        </Button>
      </Form>
    </Modal>
  );
}
