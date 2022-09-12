import React, { FC } from "react";
import { Modal, Form, Input, message, Radio, Select } from "antd";
import { observer } from "mobx-react";
import { OperationType } from "../../types";
import { getRandomBalance, getRandomType } from "../../utils";
import { operationsStore } from "../../stores/operations";

interface Props {
  isOpenModal: boolean;
  closeModal: () => any;
  id?: string;
  title?: string;
  text?: string;
  balance?: number;
  isIncome?: boolean;
}

interface OperationFormData {
  name: string;
  value: string;
  type: OperationType;
  cardNumber: string;
}

const HistoryModalComponent: FC<Props> = ({
  isOpenModal,
  closeModal,
  id,
  title = getRandomType(),
  text = "",
  balance = getRandomBalance(),
  isIncome = false,
}) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    const formData = form.getFieldsValue() as OperationFormData;
    const data = {
      name: formData.name,
      value: parseFloat(formData.value),
      type: formData.type,
      cardNumber: formData.cardNumber,
    };

    if (id) {
      operationsStore.saveOperation(id, data).then(() => {
        message.success("Операция обновлена!");
        closeModal();
        form.resetFields();
      });
    } else {
      operationsStore.saveNewOperation(data).then(() => {
        message.success("Операция сохранена!");
        closeModal();
        form.resetFields();
      });
    }
  };

  const onSubmit = () => {
    form.submit();
  };

  const onCancel = () => {
    form.resetFields();
    closeModal();
  };

  return (
    <Modal
      title={id ? `Редактирование операции` : `Новая операция`}
      open={isOpenModal}
      onOk={onSubmit}
      onCancel={onCancel}
      okText="Сохранить"
      cancelText="Отменить"
      closable
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Тип"
          name="type"
          initialValue={isIncome ? "income" : "expense"}
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio.Button value="income">Доход</Radio.Button>
            <Radio.Button value="expense">Расход</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="name"
          label="Название платежа"
          initialValue={title}
          rules={[{ required: true }]}
        >
          <Input placeholder="Продукты" />
        </Form.Item>
        <Form.Item
          name="cardNumber"
          label="Карта"
          initialValue={text}
          rules={[{ required: true }]}
        >
          <Select placeholder="Выберите карту">
            {operationsStore.cardsNumbers.map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="value"
          label="Сумма ₽"
          initialValue={balance}
          rules={[{ required: true }]}
        >
          <Input placeholder="Сумма в рублях" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const HistoryModal = observer(HistoryModalComponent);
