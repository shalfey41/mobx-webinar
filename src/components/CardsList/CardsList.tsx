import React, { FC, useEffect, useState } from "react";
import "./CardsList.css";
import { Spin } from "antd";
import { observer } from "mobx-react-lite";
import { CardItem } from "../CardItem/CardItem";
import { cardsStore } from "../../stores/cards";

const CardsListComponent: FC = () => {
  const [isLoading, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    cardsStore.fetchCards().finally(() => setLoader(false));
  }, []);

  if (isLoading) {
    return (
      <Spin>
        <section className="CardsListLoader" />
      </Spin>
    );
  }

  return (
    <section className="CardsList">
      {cardsStore.cards.map((item) => (
        <CardItem
          key={item.id}
          id={item.id}
          balance={item.balance}
          cardNumber={item.number}
          color={item.color}
        />
      ))}
    </section>
  );
};

export const CardsList = observer(CardsListComponent);
