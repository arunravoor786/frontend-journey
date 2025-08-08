import React from "react";

function CounterWithConst() {
  let count = 0;

  const increase = () => {
    // You can try: count = count + 1;
    // BUT: This will not update the displayed value on the UI!
    // alert("Clicked, but UI does NOT change! (count is still: " + count + ")");
    count += 1; // This updates the variable, but React won't re-render
    console.log("Count increased to:", count);
  };

  return (
    <div style={{border: "1px solid #999", padding: 16, margin: 20}}>
      <h2>Counter (const variable, NOT useState)</h2>
      <div style={{fontSize: 18}}>Count: {count}</div>
      <button onClick={increase}>Increase</button>
      <div style={{color: "firebrick", marginTop: 6}}>Try clicking the button—UI won't update!</div>
    </div>
  );
}

export default CounterWithConst;
