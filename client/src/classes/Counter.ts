import { makeAutoObservable } from "mobx";
class Counter {
  count: number;
  constructor() {
    this.count = 0;
    makeAutoObservable(this);
  }

  incrementCounter() {
    this.count += 1;
  }

  decrementCounter() {
    this.count -= 1;
  }
}
export const counter = new Counter();
