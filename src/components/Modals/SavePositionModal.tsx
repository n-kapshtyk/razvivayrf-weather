import { Button, Form, Input, Modal } from "antd";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectActivePosition } from "../../features/weather/selectors";
import {
  savePosition,
  setActivePosition,
  updatePositionName,
} from "../../features/weather/slice";
import { locales } from "../../locales";
import { getIsNoSavedPosition, getIsSavedPosition } from "../../utils/helpers";

interface SavePositionModalProps {
  initialName: string;
  setIsOpenSaveModal: Dispatch<SetStateAction<boolean>>;
}

export function SavePositionModal({
  initialName,
  setIsOpenSaveModal,
}: SavePositionModalProps) {
  const dispatch = useAppDispatch();
  const activePosition = useAppSelector(selectActivePosition);

  const savePositionHandler = useCallback(
    ({ positionName }: { positionName: string }) => {
      if (!activePosition) {
        return;
      }
      if (getIsNoSavedPosition(activePosition)) {
        const position = {
          id: new Date().getTime(),
          coords: activePosition,
          name: positionName,
        };
        dispatch(savePosition(position));
        dispatch(setActivePosition(position));
      } else if (getIsSavedPosition(activePosition)) {
        const updatedPosition = {
          ...activePosition,
          name: positionName,
        };
        dispatch(updatePositionName(updatedPosition));
        dispatch(setActivePosition(updatedPosition));
      }
      setIsOpenSaveModal(false);
    },
    [dispatch, activePosition, setIsOpenSaveModal]
  );

  return (
    <Modal
      title={locales.savePositionModal.title}
      open={true}
      closable={true}
      onCancel={() => setIsOpenSaveModal(false)}
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
        onFinish={savePositionHandler}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label={locales.savePositionModal.input}
          name="positionName"
          rules={[{ required: true, message: "" }]}
          initialValue={initialName}
        >
          <Input className="!w-full" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          {locales.savePositionModal.button}
        </Button>
      </Form>
    </Modal>
  );
}
