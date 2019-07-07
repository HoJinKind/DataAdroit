import React, {Component} from "react";
import { ResponsiveLine } from '@nivo/line';
import {Tabs, DragTabList, DragTab, PanelList, Panel, Tab} from 'react-tabtab';
import {simpleSwitch} from 'react-tabtab/lib/helpers/move';
import * as customStyle from "react-tabtab/lib/themes/bootstrap";
import {Dropdown} from 'semantic-ui-react';
import Field from './Field'
import 'semantic-ui-css/semantic.min.css'

class ChartHandler extends Component {
    constructor(props) {
        super(props);
        this.state = props.state;
        this.state.activeIndex = 0;
        if (!this.state.fields) {
          this.state.fields = {"x":{"id":"x"},"y":{"id":"y"},"z":{"id":"z"}};
        }
        
        this.chart = null;
        
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

    render() {
      console.log(this.state)
      var state = this.state;
        var width=window.innerWidth-200;
        var height=window.innerHeight;
        var data=[
            {
              "id": "japan",
              "color": "hsl(250, 70%, 50%)",
              "data": [
                {
                  "x": "plane",
                  "y": 230
                },
                {
                  "x": "helicopter",
                  "y": 139
                },
                {
                  "x": "boat",
                  "y": 188
                },
                {
                  "x": "train",
                  "y": 74
                },
                {
                  "x": "subway",
                  "y": 83
                },
                {
                  "x": "bus",
                  "y": 255
                },
                {
                  "x": "car",
                  "y": 137
                },
                {
                  "x": "moto",
                  "y": 213
                },
                {
                  "x": "bicycle",
                  "y": 253
                },
                {
                  "x": "horse",
                  "y": 259
                },
                {
                  "x": "skateboard",
                  "y": 254
                },
                {
                  "x": "others",
                  "y": 298
                }
              ]
            },
            {
              "id": "france",
              "color": "hsl(138, 70%, 50%)",
              "data": [
                {
                  "x": "plane",
                  "y": 154
                },
                {
                  "x": "helicopter",
                  "y": 102
                },
                {
                  "x": "boat",
                  "y": 225
                },
                {
                  "x": "train",
                  "y": 215
                },
                {
                  "x": "subway",
                  "y": 124
                },
                {
                  "x": "bus",
                  "y": 300
                },
                {
                  "x": "car",
                  "y": 52
                },
                {
                  "x": "moto",
                  "y": 76
                },
                {
                  "x": "bicycle",
                  "y": 17
                },
                {
                  "x": "horse",
                  "y": 24
                },
                {
                  "x": "skateboard",
                  "y": 117
                },
                {
                  "x": "others",
                  "y": 274
                }
              ]
            },
            {
              "id": "us",
              "color": "hsl(242, 70%, 50%)",
              "data": [
                {
                  "x": "plane",
                  "y": 66
                },
                {
                  "x": "helicopter",
                  "y": 20
                },
                {
                  "x": "boat",
                  "y": 26
                },
                {
                  "x": "train",
                  "y": 55
                },
                {
                  "x": "subway",
                  "y": 161
                },
                {
                  "x": "bus",
                  "y": 220
                },
                {
                  "x": "car",
                  "y": 293
                },
                {
                  "x": "moto",
                  "y": 143
                },
                {
                  "x": "bicycle",
                  "y": 183
                },
                {
                  "x": "horse",
                  "y": 48
                },
                {
                  "x": "skateboard",
                  "y": 199
                },
                {
                  "x": "others",
                  "y": 279
                }
              ]
            },
            {
              "id": "germany",
              "color": "hsl(121, 70%, 50%)",
              "data": [
                {
                  "x": "plane",
                  "y": 185
                },
                {
                  "x": "helicopter",
                  "y": 133
                },
                {
                  "x": "boat",
                  "y": 240
                },
                {
                  "x": "train",
                  "y": 294
                },
                {
                  "x": "subway",
                  "y": 255
                },
                {
                  "x": "bus",
                  "y": 80
                },
                {
                  "x": "car",
                  "y": 216
                },
                {
                  "x": "moto",
                  "y": 151
                },
                {
                  "x": "bicycle",
                  "y": 263
                },
                {
                  "x": "horse",
                  "y": 271
                },
                {
                  "x": "skateboard",
                  "y": 257
                },
                {
                  "x": "others",
                  "y": 254
                }
              ]
            },
            {
              "id": "norway",
              "color": "hsl(100, 70%, 50%)",
              "data": [
                {
                  "x": "plane",
                  "y": 10
                },
                {
                  "x": "helicopter",
                  "y": 277
                },
                {
                  "x": "boat",
                  "y": 79
                },
                {
                  "x": "train",
                  "y": 149
                },
                {
                  "x": "subway",
                  "y": 243
                },
                {
                  "x": "bus",
                  "y": 15
                },
                {
                  "x": "car",
                  "y": 129
                },
                {
                  "x": "moto",
                  "y": 43
                },
                {
                  "x": "bicycle",
                  "y": 295
                },
                {
                  "x": "horse",
                  "y": 260
                },
                {
                  "x": "skateboard",
                  "y": 218
                },
                {
                  "x": "others",
                  "y": 256
                }
              ]
            }
          ]
         
    //       <Tabs activeIndex={this.state.activeIndex}
    //       onTabChange={this.handleTabChange}
    //       onTabSequenceChange={this.handleTabSequenceChange} customStyle={customStyle} onTabEdit={this.handleEdit}>
    //   <DragTabList>
    //   {tabLists}
    //   </DragTabList>
    //   <PanelList>
    //       {tabPanels}
    //   </PanelList>
    // </Tabs>

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
        chart = <div style={{height:400}}><ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', stacked: false, min: 'auto', max: 'auto' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'top-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    /></div>;
    fields = ["x","y"].map((field)=>{return(
      <Field state={this.state.fields[field]}></Field>)
    });
        break;
    }
        
     
        return (
          <div style={{'borderColor':'red','borderStyle':'dotted','margin':10}}>
          <Dropdown placeholder='Chart' search selection options={chartOptions} onChange={this.onChartSelected}/>
            <Tabs 
                    activeIndex={this.state.activeIndex}
                    onTabChange={this.handleTabChange}
                    onTabSequenceChange={this.handleTabSequenceChange}
                    customStyle={customStyle}
                    onTabEdit={this.handleEdit}
                >
                <DragTabList>
                
                  <Tab>Chart</Tab>
                  <Tab>Fields</Tab>
                </DragTabList>
                    <PanelList>
                      <Panel>
                      
                      
                      {chart}
            
            
                      </Panel>
                      <Panel>
                        {fields}
                      </Panel>
                    </PanelList>

                </Tabs>
                </div>
                
            

           
           

            
        )
    }
}

export default ChartHandler;