import React, { Component } from "react";
import * as d3 from "d3";
import ReactFileReader from "react-file-reader";

class UploadCSV extends Component {
  handleFiles = files => {
    var reader = new FileReader();
    reader.onload = function(e) {
      // Use reader.result
      alert(reader.result);
    };
    reader.readAsText(files[0]);
  };
  render() {
    return (
      <ReactFileReader handleFiles={this.handleFiles} fileTypes={".csv"}>
        <button className='btn'>Upload</button>
      </ReactFileReader>
    );
  }
}

export default UploadCSV;
