import React, { Component } from "react";
import * as d3 from "d3";
import { BrowserRouter, Redirect, withRouter } from "react-router-dom";
import { CSVReader } from "react-papaparse";

class UploadCSV extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  handleReadCSV = data => {
    // const b = data.map(Number);
    console.log(data);
    console.log(this.fileInput.current.files[0].name)
    var res = data.data[1].map(function(v) {
      return parseInt(v, 10);
    });

    console.log(res);
    // this.props.history.push({
    //   pathname: "/charts",
    //   state: { detail: res, title: data.data[0][0],data:data }
    // });
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  handleImportOffer = () => {
    const file = this.fileInput;
    file.current.click();
    
  };

  render() {
    return (
      <div>
        <CSVReader
          onFileLoaded={this.handleReadCSV}
          inputRef={this.fileInput}
          style={{ display: "none" }}
          onError={this.handleOnError}
        />
        <button onClick={this.handleImportOffer}>Import</button>
      </div>
    );
    
  }
}

export default withRouter(UploadCSV);
