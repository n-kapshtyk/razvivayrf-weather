import { Button, Form, Input, Modal } from "antd";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectActivePosition } from "../../features/weather/selectors";
import { savePosition, setActivePosition } from "../../features/weather/slice";

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
    (values: { positionName: string }) => {
      if (activePosition && "lat" in activePosition) {
        const position = {
          id: new Date().getTime(),
          coords: activePosition,
          name: values.positionName,
        };
        dispatch(savePosition(position));
        dispatch(setActivePosition(position));
      }
    },
    [dispatch, activePosition]
  );

  return (
    <Modal
      open={true}
      closable={true}
      onCancel={() => setIsOpenSaveModal(false)}
      centered={true}
      cancelButtonProps={{
        hidden: true,
      }}
      okButtonProps={{
        hidden: true,
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
          rules={[{ required: true }]}
          initialValue={initialName}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Сохранить позицию
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
