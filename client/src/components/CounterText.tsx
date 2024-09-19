import { counter } from "@/classes/Counter";
import { observer } from "mobx-react";
export const CounterText = observer(() => {
  return (
    <div>
      <h1>Counter: {counter.count}</h1>
      <button onClick={() => counter.incrementCounter()}>
        Increment Counter
      </button>
      <button onClick={() => counter.decrementCounter()}>
        Decrement Counter
      </button>
    </div>
  );
});
