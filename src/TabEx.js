import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

class TabEx extends Component {
    constructor(props) {
         super(props);
        this.state = { 
            tabIndex: 0,
            boards:[]
        };
    }
    render() {
      return (
        <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
          <TabList>
            <Tab>Title 1</Tab>
            <Tab>Title 2</Tab>
          </TabList>
          <TabPanel>aaa</TabPanel>
          <TabPanel>bbb</TabPanel>
        </Tabs>
      );
    }
}

export default TabEx;