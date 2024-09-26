"use client";
import { Typography } from "@mui/material";
import { useState } from "react";

export function CounterText() {
  const [count, setCount] = useState<number>(0);
  return (
    <div>
      <Typography variant="h1">I love avocadoes</Typography>
      <Typography variant="h3">Counter: {count}</Typography>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        <Typography variant="button">Increment Counter</Typography>
      </button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>
        <Typography variant="button">Decrement Counter</Typography>
      </button>
    </div>
  );
}
