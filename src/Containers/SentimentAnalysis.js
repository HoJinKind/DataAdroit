import React, { Component } from "react";
import Loader from "./Loader";
import ReactDOM from "react-dom";
import { Router, route, Link } from "react-router-dom";
import { BrowserRouter, Redirect, withRouter } from "react-router-dom";
import ReactWordcloud from "react-wordcloud";
import { red } from "@material-ui/core/colors";
import Cloud from "./Cloud"

const negOptions = {
  colors: ["#FF0000"],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "impact",
  fontSizes: [20, 70],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 1.5,
  rotations: 3,
  rotationAngles: [90, 0],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 1000
};

const posOptions = {
  colors: ["#008000"],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "impact",
  fontSizes: [20, 100],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 1.5,
  rotations: 3,
  rotationAngles: [90, 0],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 1000
};

//Global variables
var negativeMap = {};
var positiveMap = {};
var tokensMap = {};
var wordsMap = {};
var rneg, pneg;

class SentimentAnalysis extends Component {
  constructor(props) {
    super(props);
    const key = this.props.history.location.state.state.keywordtext;
    console.log(key);
    this.state = {
      list: "",
      loading: true,
      rneg: [],
      pneg: [],
      fp:[],
      fn:[]
    };
    this.postReqForSA();
    this.cloud = this.cloud.bind(this);
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
        console.log(json)

        // //For wordcloud
        // for (var i = 0; i < json["negative"].length; i++) {
        //   var negativeKey = json.negative[i];
        //   if (negativeKey in negativeMap) {
        //     negativeMap[negativeKey] += 1;
        //   } else {
        //     negativeMap[negativeKey] = 1;
        //   }
        // }

        // for (var i = 0; i < json["positive"].length; i++) {
        //   var positiveKey = json.positive[i];
        //   if (positiveKey in positiveMap) {
        //     positiveMap[positiveKey] += 1;
        //   } else {
        //     positiveMap[positiveKey] = 1;
        //   }
        // }

        // for (var i = 0; i < json["tokens"].length; i++) {
        //   var tokensKey = json.tokens[i];
        //   if (tokensKey in tokensMap) {
        //     tokensMap[tokensKey] += 1;
        //   } else {
        //     tokensMap[tokensKey] = 1;
        //   }
        // }

        // for (var i = 0; i < json["words"].length; i++) {
        //   var wordsKey = json.words[i];
        //   if (wordsKey in wordsMap) {
        //     wordsMap[wordsKey] += 1;
        //   } else {
        //     wordsMap[wordsKey] = 1;
        //   }
        // }
        // rneg = Object.keys(negativeMap).map(negative => {
        //   return {
        //     text: negative,
        //     value: negativeMap[negative]
        //   };
        // });
        // pneg = Object.keys(positiveMap).map(positive => {
        //   return {
        //     text: positive,
        //     value: positiveMap[positive]
        //   };
        // });
        // console.log("Negative: ", negativeMap);
        this.setState({ rneg: json["negative"], pneg: json["positive"] });
      });

      fetch(`/api/getNews/${this.props.history.location.state.state.keywordtext}`)
    .then(res => res.json())
    .then(json => {
      this.setState({fp:json["positive"],fn:json["negative"]})
    })
    // .then(list => this.setState({ list }))
    // .then((this.loading = false));
  };

  cloud = () => {
    {
      return (
        <div>
          <style>width: 500</style>
          <div>
            <ReactWordcloud options={posOptions} words={this.state.pneg} />
            <ReactWordcloud options={negOptions} words={this.state.rneg} />
          </div>
          <div className="goBackLink" style={{ textAlign: "bottom" }}>
            <Link to="/sentiment">Go Back</Link>
          </div>
        </div>
      );
    }
  };

  render() {
    // if (this.state.loading) return <Loader />;
    // // else return <p>{this.state.score}</p>;
    // else return this.cloud();
   
    return (
      <div style={{'margin':'5px'}}>
        <h1>Sentiment Analysis result for {this.props.history.location.state.state.keywordtext}</h1>
        <h2>Top websites:</h2>
        {this.state.loading?<Loader/>:null}
        <Cloud options={posOptions} posList={this.state.pneg} negList={this.state.rneg}/>
        <h2>News:</h2>
        <Cloud options={posOptions} posList={this.state.fp} negList={this.state.fn}/>
        
      </div>
    )
  }
}

export default withRouter(SentimentAnalysis);
