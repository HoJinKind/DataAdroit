import React, { Component } from "react";
import * as d3 from "d3";

import { BrowserRouter, Redirect, withRouter } from "react-router-dom";

import rd3 from "react-d3-library";

import Source from "./Source";


class BarChart extends Component {
  state = {
    name: "",
    data:""
  };
  componentDidMount() {
    this.setState({d3:''})
    this.drawChart();
  }

  drawChart() {
    var data_raw = this.props.location.state.data.data;
    const detail = this.props.location.state.detail;
    console.log(detail)
    this.setState({
      name: this.props.location.state.title,
      data: this.props.location.state.data.data
    }); //using setstate

    console.log(data);
    var doesColumnExist = false;
    
    var data = []
    for (var i=1; i<data_raw.length;i++) {
      var line = {};
      for (var j=0;j<data_raw[0].length;j++) {
        line[data_raw[0][j]] = data_raw[i][j];
      }
      data.push(line)
    }
    console.log(data);
    // const svg = d3
    //   .select("body")
    //   .append("svg")
    //   .attr("width", 1000)
    //   .attr("height", this.props.height);
    // console.log(detail)
    // svg
    //   .selectAll("rect")
    //   .data(detail)
    //   .enter()
    //   .append("rect")
    //   .attr("x", (d, i) => i * 70)
    //   .attr("y", (d, i) => 100 - 10 * d)
    //   .attr("width", 65)
    //   .attr("height", (d, i) => d * 10)
    //   .attr("fill", "green");
    //const svg = d3.select('body');

    
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
