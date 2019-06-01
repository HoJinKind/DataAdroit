import React, { Component } from "react";
import * as d3 from "d3";
import ReactFileReader from "react-file-reader";
import { BrowserRouter, Redirect, withRouter } from "react-router-dom";

class UploadCSV extends React.Component {
  state = {
    toDashboard: false
  };

  handleToDashBoard = () => {
    const { toDashboard } = this.state;
    this.setState({
      toDashboard: !toDashboard
    });
  };

  handleFiles = files => {
    const { toDashboard } = this.state;
    var reader = new FileReader();
    reader.onload = function(e) {
      // Use reader.result
      alert(reader.result);
    };

    const { router } = this.context;
    this.props.history.push("/charts");
    reader.readAsText(files[0]);
  };
  render() {
    return (
      <ReactFileReader handleFiles={this.handleFiles} fileTypes={".csv"}>
        <button className='btn'>Upload </button>
      </ReactFileReader>
    );
  }
}

export default withRouter(UploadCSV);
