import React, { Component } from "react";
import * as d3 from "d3";

import { BrowserRouter, Redirect, withRouter } from "react-router-dom";

class BarChart extends Component {
  state = {
    name: ""
  };
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    const data = this.props.data;
    const detail = this.props.location.state.detail;
    this.setState({
      name: this.props.location.state.title
    }); //using setstate

    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", 1000)
      .attr("height", this.props.height);

    svg
      .selectAll("rect")
      .data(detail)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => 100 - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green");
  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <div id={"#" + this.props.id} />
      </div>
    );
  }
}

export default BarChart;
