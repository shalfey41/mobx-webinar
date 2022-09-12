import { makeAutoObservable } from "mobx";
import { CardsAPI } from "../types";
import {
  apiDeleteCard,
  apiGetCards,
  apiSaveNewCard,
  apiUpdateCard,
} from "../api";

class CardsStore {
  cards: CardsAPI[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchCards = async () => {
    const cards = await apiGetCards();
    this.setCards(cards);
  };

  saveNewCard = async (card: Omit<CardsAPI, "id" | "created">) => {
    const newCard = await apiSaveNewCard(card);

    if (newCard) {
      this.addCard(newCard);
    }
  };

  saveCard = async (id: string, card: Omit<CardsAPI, "id" | "created">) => {
    const newCard = await apiUpdateCard(id, card);

    if (newCard) {
      this.updateCard(id, newCard);
    }
  };

  deleteCard = async (id: string) => {
    await apiDeleteCard(id);
    this.removeCard(id);
  };

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
