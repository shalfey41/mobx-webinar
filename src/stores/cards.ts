import { makeAutoObservable } from "mobx";
import { CardsAPI } from "../types";

class CardsStore {
  cards: CardsAPI[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCards = (cards: CardsAPI[]) => {
    this.cards = cards;
  };

  addCard = (card: CardsAPI) => {
    this.cards.push(card);
    this.cards.sort((a, b) => b.created.seconds - a.created.seconds);
  };

  updateCard = (id: string, card: Omit<CardsAPI, "id">) => {
    this.cards = this.cards.map((item) => {
      if (item.id === id) {
        return {
          id,
          ...card,
        };
      }

      return item;
    });
  };

  removeCard = (id: string) => {
    this.cards = this.cards.filter((item) => item.id !== id);
  };
}

export const cardsStore = new CardsStore();
