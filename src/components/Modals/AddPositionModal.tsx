import { Button, Form, InputNumber, Modal } from "antd";
import React, { Dispatch, SetStateAction } from "react";

interface AddPositionModalProps {
  setIsOpenAddModal: Dispatch<SetStateAction<boolean>>;
}

export function AddPositionModal({ setIsOpenAddModal }: AddPositionModalProps) {
  return (
    <Modal
      open={true}
      closable={true}
      onCancel={() => setIsOpenAddModal(false)}
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
        onFinish={(values) => console.log("values", values)}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item label="Широта" name="latitude" rules={[{ required: true }]}>
          <InputNumber<string> stringMode />
        </Form.Item>
        <Form.Item
          label="Долгота"
          name="longitude"
          rules={[{ required: true }]}
        >
          <InputNumber<string> stringMode />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Поиск позиции
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
