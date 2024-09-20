import { counter } from "@/classes/Counter";
import { observer } from "mobx-react";
import { Typography } from "@mui/material";
export const CounterText = observer(() => {
  return (
    <div>
      <Typography variant="h3">Content {counter.count}</Typography>
      <button onClick={() => counter.incrementCounter()}>
        <Typography variant="button">Increment Counter</Typography>
      </button>
      <button onClick={() => counter.decrementCounter()}>
        <Typography variant="button">Decrement Counter</Typography>
      </button>
    </div>
  );
});
