import React, { useState } from "react";

function CounterWithUseState() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  console.log("Initial count:", count);
    console.log("Initial text:", text);

  const increase = () => setCount(count + 1);

  return (
    <div style={{border: "1px solid #3182ce", padding: 16, margin: 20}}>
      <h2>Counter (with useState hook)</h2>
      <div style={{fontSize: 18}}>Count: {count}</div>
      <button onClick={increase}>Increase</button>
      <div style={{color: "green", marginTop: 6}}>Clicking increases count in the UI!</div>
      
    </div>
  );
}

export default CounterWithUseState;
