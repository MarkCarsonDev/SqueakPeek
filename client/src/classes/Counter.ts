import {makeAuto}
class Counter {
  count: number;
  constructor() {
    this.count = 0;
  }

  incrementCounter() {
    this.count += 1;
  }

  decrementCounter() {
    this.count -= 1;
  }
}
