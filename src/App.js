import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//issue? nt sure man,
import BarChart from "./BarChart";
import Login from "./Login";
import UploadCSV from "./UploadCSV";

class App extends Component {
  state = {
    data: [6, 6, 6, 6, 6, 6],
    width: 700,
    height: 500
  };
  //render={(props) => <BarChart {...props} data=this.state.data />}
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            {/* home page */}
            <Route
              path='/charts'
              render={props => <BarChart {...props} data={this.state.data} />}
            />
            <Route path='/uploadcsv' component={UploadCSV} />
            <Route path='/' component={Login} exact />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
