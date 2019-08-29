import React, { Component } from "react";
import Loader from "./Loader";
import { BrowserRouter, Redirect, withRouter } from "react-router-dom";

class SentimentAnalysis extends Component {
  constructor(props) {
    super(props);
    const key = this.props.history.location.state.state.keywordtext;
    console.log(key);
    this.state = {
      list: "",
      loading: true
    };
    this.postReqForSA();
  }

  postReqForSA = () => {
    console.log("running");
    fetch("/api/webscrape", {
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

  render() {
    if (this.state.loading) return <Loader />;
    else return <p>{this.state.score}</p>;
  }
}
export default withRouter(SentimentAnalysis);
