import React from "react";
import CounterWithConst from "./CounterWithConst";
import CounterWithUseState from "./CounterWithUseState";

function App() {
  return (
    <div>
      <h1>React Counter Demo: useState vs const</h1>
      <CounterWithConst />
      <CounterWithUseState />
    </div>
  );
}

export default App;
