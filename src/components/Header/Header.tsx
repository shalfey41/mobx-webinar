import React, { FC, useState } from "react";
import "./Header.css";
import { Typography, Button } from "antd";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import { CardModal } from "../CardModal/CardModal";

interface Props {}

export const Header: FC<Props> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="Header">
        <Typography.Title>Мой кошелёк</Typography.Title>
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<PlusOutlined />}
          onClick={showModal}
        />
      </div>

      <CardModal closeModal={closeModal} isOpenModal={isModalVisible} />
    </>
  );
};
