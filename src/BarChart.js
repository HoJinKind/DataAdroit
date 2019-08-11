    import React, {Component} from "react";
import { ResponsiveBar } from '@nivo/bar';

class BarChart extends Component {
    constructor(props) {
        super(props);
        console.log(props.pivot)
        this.state = {
            'pivot':props.pivot,
            'variables':props.variables,
            'data':props.data
        }
    }

    getData = (pivot,variables,data)=> {
        var res = data.map((d)=>{
          var line = {};
          line[pivot[0].name] = d[pivot[0].name];
          variables.forEach((v)=>{
            line[v.name] = parseInt(d[v.name]);
          })
          return line;
        })
        return res;
    }

    render() {
        if (this.props.pivot.length==0||this.props.variables.length==0) {
            return null;
        }
        var data = this.getData(this.props.pivot,this.props.variables,this.props.data);
        
        var keys = this.props.variables.map((v) => v.name);
        return(
            <div style={{height:400}}>
                <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={this.props.pivot[0].name}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: this.props.pivot[0].name,
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'value',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
            </div>
        );
        
    }
}

export default BarChart;