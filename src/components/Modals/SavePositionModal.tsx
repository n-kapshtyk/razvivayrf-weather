import { Button, Form, Input, Modal } from "antd";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectActivePosition } from "../../features/weather/selectors";
import {
  savePosition,
  setActivePosition,
  updatePositionName,
} from "../../features/weather/slice";

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

  //todo
  const savePositionHandler = useCallback(
    ({ positionName }: { positionName: string }) => {
      if (!activePosition) {
        return;
      }
      if ("lat" in activePosition) {
        const position = {
          id: new Date().getTime(),
          coords: activePosition,
          name: positionName,
        };
        dispatch(savePosition(position));
        dispatch(setActivePosition(position));
      } else if ("id" in activePosition) {
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
      title="Cохранить позицию"
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
          label="Название"
          name="positionName"
          rules={[{ required: true, message: "" }]}
          initialValue={initialName}
        >
          <Input className="!w-full" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form>
    </Modal>
  );
}
