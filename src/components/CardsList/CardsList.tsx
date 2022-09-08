import React, { FC, useEffect, useState } from "react";
import "./CardsList.css";
import { Spin } from "antd";
import { apiGetCards } from "../../api";
import { CardsAPI } from "../../types";
import { CardItem } from "../CardItem/CardItem";

export const CardsList: FC = () => {
  const [isLoading, setLoader] = useState(false);
  const [cards, setCards] = useState<CardsAPI[]>([]);

  useEffect(() => {
    setLoader(true);
    apiGetCards()
      .then(setCards)
      .finally(() => setLoader(false));
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
      {cards.map((item) => (
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
