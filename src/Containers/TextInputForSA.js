import React, { Component } from "react";
import * as d3 from "d3";
import { BrowserRouter, Redirect, withRouter } from "react-router-dom";
import { CSVReader } from "react-papaparse";
import { blueGrey } from "@material-ui/core/colors";

class TextInputForSA extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }
  Navigate = keyword => {
    console.log(keyword);
    this.props.history.push("/uploadcsv", {
      state: { addExpense: keyword }
    });
  };

  render() {
    return (
      <div>
        <input
          id='keywordtext'
          name='keywordtext'
          autoFocus
          STYLE='color: #FFFFFF; font-family: Verdana; font-weight: bold; font-size: 12px; background-color: #72A4D2;'
        />
        <button
          type='submit'
          onClick={() => {
            this.Navigate(document.getElementById("keywordtext").value);
          }}
        >
          analyze
        </button>
      </div>
    );
  }
}

export default withRouter(TextInputForSA);
