import { makeAutoObservable } from "mobx";
import { OperationAPI } from "../types";

class OperationsStore {
  operations: OperationAPI[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setOperations = (operations: OperationAPI[]) => {
    this.operations = operations;
  };

  addOperation = (operation: OperationAPI) => {
    this.operations.push(operation);
    this.operations.sort((a, b) => b.created.seconds - a.created.seconds);
  };

  updateOperation = (id: string, operation: Omit<OperationAPI, "id">) => {
    this.operations = this.operations.map((item) => {
      if (item.id === id) {
        return {
          id,
          ...operation,
        };
      }

      return item;
    });
  };

  removeOperation = (id: string) => {
    this.operations = this.operations.filter((item) => item.id !== id);
  };
}

export const operationsStore = new OperationsStore();
