"use client";
import { CounterText } from "@/components/CounterText";
import { observer } from "mobx-react";
const Home = observer(() => {
  return <CounterText />;
});

export default Home;
