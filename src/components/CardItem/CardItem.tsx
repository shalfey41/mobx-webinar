import React, { FC, useState } from "react";
import "./CardItem.css";
import { Statistic, Button, Typography, Menu, Dropdown, Modal } from "antd";
import EllipsisOutlined from "@ant-design/icons/EllipsisOutlined";
import ExclamationCircleOutlined from "@ant-design/icons/ExclamationCircleOutlined";
import classnames from "classnames";
import { CardModal } from "../CardModal/CardModal";
import { CardColor } from "../../types";
import { apiDeleteCard } from "../../api";
import { cardsStore } from "../../stores/cards";

interface Props {
  balance: number;
  cardNumber: string;
  id: string;
  color?: CardColor;
}

export const CardItem: FC<Props> = ({ id, balance, cardNumber, color }) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
  };

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "Удалить карту?",
      icon: <ExclamationCircleOutlined />,
      content: "Отменить удаление будет невозможно",
      cancelText: "Отменить",
      okText: "Удалить",
      onOk() {
        return apiDeleteCard(id).then(() => {
          cardsStore.removeCard(id);
        });
      },
      onCancel() {},
    });
  };

  return (
    <>
      <section
        className={classnames("CardItem", {
          [`CardItem--${color}`]: color !== undefined,
        })}
      >
        <header className="CardItem__header">
          <Statistic
            value={balance}
            groupSeparator=" "
            suffix="₽"
            valueStyle={{ color: "white" }}
          />
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
            <Button shape="circle" size="small" icon={<EllipsisOutlined />} />
          </Dropdown>
        </header>

        <Typography.Text style={{ color: "white" }}>
          {cardNumber}
        </Typography.Text>
      </section>

      <CardModal
        id={id}
        cardNumber={cardNumber}
        balance={balance.toString()}
        color={color}
        closeModal={closeEditModal}
        isOpenModal={isEditModalVisible}
      />
    </>
  );
};
