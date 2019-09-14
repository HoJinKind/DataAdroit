import React, { Component } from "react";
import Loader from "./Loader";
import ReactDOM from "react-dom";
import { Router, route, Link } from "react-router-dom";
import { BrowserRouter, Redirect, withRouter } from "react-router-dom";
import { red } from "@material-ui/core/colors";


class FinancialDataDisplay extends Component {
  constructor(props) {
    super(props);
    const key = this.props.history.location.state.state.keywordtext;
    console.log(key);
    this.state = {
      list: "",
      loading: true,
      rneg: [],
      pneg: []
    };
    this.postReqForSA();
    this.cloud = this.cloud.bind(this);
  }

  postReqForSA = () => {
    console.log("running");
    fetch("/api/financialDatadashboard", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.props.history.location.state.state.keywordtext
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log("parsed json", json); // access json.body here
        this.state.loading = false;
        this.setState({ loading: false, score: json.score });
      });
    // .then(res => res.json())
    // .then(console.log(res.json))
    // .then(list => this.setState({ list }))
    // .then((this.loading = false));
  };

  cloud = () => {
    {
      return (
        <div>
          <style>width: 500</style>
          <div>
          </div>
          <div className="goBackLink" style={{ textAlign: "bottom" }}>
            <Link to="/financialData">Go Back</Link>
          </div>
        </div>
      );
    }
  };

  render() {
    if (this.state.loading) return <Loader />;
    // else return <p>{this.state.score}</p>;
    else return this.cloud();
  }
}

export default withRouter(FinancialDataDisplay);
