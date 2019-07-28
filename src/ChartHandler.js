import React, {Component} from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import {Dropdown} from 'semantic-ui-react';
import Field from './Field';
import Data from './Data';
import {DropTarget} from 'react-dnd';
import 'semantic-ui-css/semantic.min.css';
import LineChart from "./LineChart";

class ChartHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
          'source':null,
          'activeIndex':0,
          'chartKey':0,
          'fields' : {
            "pivot":{"id":"pivot"},
            "variables":{"id":"variables"},
            "z":{"id":"z"}
          },
        }
        this.fieldUpdate = this.fieldUpdate.bind(this);
        
        
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    handleTabChange = index => {
      var state = this.state;
      state.activeIndex = index;
      this.setState(state);
  };

  onChartSelected = (e, data) => {
    var state = this.state;
    state.chart = data.value;
    this.setState(state);
  };

  fieldUpdate = (s) => {
    console.log('c',this);
    var state = this.state;
    state.chartKey += 1;
    state.fields[s.id] = s;
    this.setState(state);
  }

    render() {
      console.log('chartH rerender');
      const { isOver, canDrop, connectDropTarget, droppedItem } = this.props;
      console.log(this.state)
      var state = this.state;

    var chartOptions = [
      {
        "key":0,
        "text":"Line",
        "value":"Line"
      },
      {
        "key":1,
        "text":"Bar",
        "value":"Bar"
      },
      {
        "key":2,
        "text":"Pie",
        "value":"Pie"
      },
      {
        "key":3,
        "text":"Bubble",
        "value":"Bubble"
      }
    ]

    var chart = null;
    var fields = null;

    switch (state.chart) {
      case "Line":
        if (this.state.source!=null) {
          chart = <LineChart 
        pivot={this.state.fields.pivot.variables} 
        variables={this.state.fields.variables.variables}
        data={this.state.source.data} key={this.state.chartKey}/>
        }

    fields = ["pivot","variables"].map((field)=>{return(
      <Field id={field} key={field} onUpdate={this.fieldUpdate}></Field>)
    });
        break;
    }
    
    var data=null
    if (this.state.source != null) {
      var source = this.state.source
      data = <Data name={source.name} features={source.features} data={source.data}/>
    }
        return connectDropTarget(
          <div style={{'margin':10}}>
          {/* <Dropdown placeholder='Chart' search selection options={chartOptions} onChange={this.onChartSelected}/> */}
            <Tabs forceRenderTabPanel>
                <TabList>
                  <Tab disabled>
          <Dropdown placeholder='Chart' search selection options={chartOptions} onChange={this.onChartSelected}/>

                  </Tab>
                  <Tab>Chart</Tab>
                  <Tab>Fields</Tab>
                </TabList>
                <TabPanel/>
                <TabPanel>
                  {chart}
                </TabPanel>
                <TabPanel>
                  {data}
                  {fields}
                </TabPanel>

            </Tabs>
          </div>
        )
    }
}

const spec = {
  drop(props, monitor, component) {
      const item = monitor.getItem()
      
      var state = component.state
      state['source']=item
      component.setState(state)
  }
}

function collect(connect, monitor) {
  return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({shallow: true}),
      canDrop: monitor.canDrop()
  }
}

export default DropTarget("SOURCE", spec, collect)(ChartHandler);