import React from "react";
import ReactDOM from "react-dom";
import ReactWordcloud from "react-wordcloud";

import words from "./words";

const options = {
  colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "impact",
  fontSizes: [5, 60],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 1,
  rotations: 3,
  rotationAngles: [90, 0],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 1000
};

function Cloud() {
  return (
    <div>
      <p>Configure options in the code editor!</p>
      <div style={{ height: 400, width: 600 }}>
        <ReactWordcloud options={options} words={words} />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Cloud />, rootElement);
export default Cloud;
