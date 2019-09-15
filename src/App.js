import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//issue? nt sure man,
import BarChart from "./BarChart";
import Login from "./Login";
import UploadCSV from "./UploadCSV";
import Exploratory from "./Exploratory";
import Source from "./Source";
import Container from "./Container";
import Test from "./Test";
import testbackend from "./testBackendApi";
import home from "./Containers/HomePage";
import textSA from "./Containers/TextInputForSA";
import SA from "./Containers/SentimentAnalysis";
import FD from "./Containers/TextInputForStockCode";
import FDD from "./Containers/financialDataDisplay";
import TextInputForStockCode from "./Containers/TextInputForStockCode";

class App extends Component {
  state = {
    data: [6, 3, 1, 6, 6, 6],
    width: 1000,
    height: 10000
  };
  //render={(props) => <BarChart {...props} data=this.state.data />}
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            {/* home page */}
            <Route
              path="/charts"
              render={props => (
                <BarChart
                  {...props}
                  data={(this.state.data, this.state.width)}
                />
              )}
            />
            <Route path="/home" component={home} />
            <Route path="/uploadcsv" component={UploadCSV} />
            <Route path="/" component={Login} exact />
            <Route path="/exploratory" component={Exploratory} />
            <Route path="/source" component={Container} />
            <Route path="/test" component={Test} />
            <Route path="/sentiment" component={textSA} />
            <Route path="/financialData" component={FD} />
            <Route path="/financialDataDisplay" component={FDD} props />
            <Route path="/stockCodeInput" component={TextInputForStockCode} />
            <Route path="/analyze" component={SA} props />
            <Route path="/testbackendapi" component={testbackend} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
