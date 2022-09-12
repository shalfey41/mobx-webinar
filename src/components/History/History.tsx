import React, { FC, useEffect, useState } from "react";
import "./History.css";
import { List } from "antd";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import { HistoryHeader } from "../HistoryHeader/HistoryHeader";
import { HistoryListItem } from "../HistoryListItem/HistoryListItem";
import { operationsStore } from "../../stores/operations";

interface Props {}

const HistoryComponent: FC<Props> = () => {
  const [isLoading, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    operationsStore.fetchOperations().finally(() => setLoader(false));
  }, []);

  return (
    <section className="History">
      <HistoryHeader />

      <div className="History__list">
        <List
          size="small"
          itemLayout="horizontal"
          loading={isLoading}
          dataSource={toJS(operationsStore.operations)}
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

export const History = observer(HistoryComponent);
