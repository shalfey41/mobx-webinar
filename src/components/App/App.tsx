import React, { FC } from "react";
import "./App.css";
import { Header } from "../Header/Header";
import { CardsList } from "../CardsList/CardsList";
import { History } from "../History/History";

interface Props {}

export const App: FC<Props> = () => {
  return (
    <section className="App">
      <div className="container">
        <Header />

        <div className="App__grid">
          <CardsList />
          <History />
        </div>
      </div>
    </section>
  );
};
