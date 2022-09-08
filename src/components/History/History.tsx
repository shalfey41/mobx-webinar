import React, { FC, useEffect, useState } from "react";
import "./History.css";
import { List } from "antd";
import { HistoryHeader } from "../HistoryHeader/HistoryHeader";
import { HistoryListItem } from "../HistoryListItem/HistoryListItem";
import { OperationAPI } from "../../types";
import { apiGetOperations } from "../../api";

interface Props {}

export const History: FC<Props> = () => {
  const [isLoading, setLoader] = useState(false);
  const [operations, setOperations] = useState<OperationAPI[]>([]);

  useEffect(() => {
    setLoader(true);
    apiGetOperations()
      .then(setOperations)
      .finally(() => setLoader(false));
  }, []);

  return (
    <section className="History">
      <HistoryHeader />

      <div className="History__list">
        <List
          size="small"
          itemLayout="horizontal"
          loading={isLoading}
          dataSource={operations}
          renderItem={(item) => (
            <HistoryListItem
              id={item.id}
              title={item.name}
              text={item.cardNumber}
              balance={item.value}
              isIncome={item.type === "income"}
              avatarSrc={`https://joeschmoe.io/api/v1/random/?${Math.random()}`}
            />
          )}
        />
      </div>
    </section>
  );
};
