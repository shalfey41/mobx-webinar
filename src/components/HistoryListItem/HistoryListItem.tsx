import React, { FC, useState } from "react";
import "./HistoryListItem.css";
import { Typography, List, Avatar, Dropdown, Menu, Button, Modal } from "antd";
import EllipsisOutlined from "@ant-design/icons/EllipsisOutlined";
import ExclamationCircleOutlined from "@ant-design/icons/ExclamationCircleOutlined";
import { HistoryModal } from "../HistoryModal/HistoryModal";
import { apiDeleteOperation } from "../../api";
import { operationsStore } from "../../stores/operations";

interface Props {
  id: string;
  title: string;
  text: string;
  balance: number;
  isIncome: boolean;
  avatarSrc: string;
}

export const HistoryListItem: FC<Props> = ({
  id,
  title,
  text,
  balance,
  avatarSrc,
  isIncome = false,
}) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
  };

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "Удалить операцию?",
      icon: <ExclamationCircleOutlined />,
      content: "Отменить удаление будет невозможно",
      cancelText: "Отменить",
      okText: "Удалить",
      onOk() {
        return apiDeleteOperation(id).then(() => {
          operationsStore.removeOperation(id);
        });
      },
      onCancel() {},
    });
  };

  return (
    <>
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={avatarSrc} />}
          title={title}
          description={text}
        />
        <div className="HistoryListItem__extra">
          <Dropdown
            overlay={
              <Menu
                items={[
                  { key: "1", onClick: showEditModal, label: "Изменить" },
                  {
                    key: "2",
                    danger: true,
                    onClick: showDeleteConfirm,
                    label: "Удалить",
                  },
                ]}
              />
            }
          >
            <Button size="small" shape="circle" icon={<EllipsisOutlined />} />
          </Dropdown>
          <Typography.Text type={isIncome ? "success" : "secondary"}>
            {isIncome ? "+" : ""}
            {balance.toLocaleString("ru-RU", {
              style: "currency",
              currency: "RUB",
              maximumFractionDigits: 0,
            })}
          </Typography.Text>
        </div>
      </List.Item>

      <HistoryModal
        id={id}
        balance={balance}
        title={title}
        text={text}
        isIncome={isIncome}
        closeModal={closeEditModal}
        isOpenModal={isEditModalVisible}
      />
    </>
  );
};
