import React, {Component} from "react";
import { ResponsiveBar } from '@nivo/bar';

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'pivot':props.pivot,
            'variables':props.variables,
            'data':JSON.parse(JSON.stringify(props.data))
        }
    }

    getRandomColor= () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    getData = (pivot,variables,data)=> {
        if (pivot[0].type=='num') {
            data = data.sort((a,b)=> {
                return a[pivot[0].name] - b[pivot[0].name];
            })
        }
        var res = variables.map((v,i)=>{
            return ({
                "id":v.name,
                "color":this.getRandomColor(),
                "data":data.map((d,i)=>{
                    var x = d[pivot[0].name];
                    var y = d[v.name];
                    if (!isNaN(x)) {
                        x=parseInt(x);
                    }
                    if (!isNaN(y)) {
                        y=parseInt(y);
                    }
                    return ({
                        "x":x,
                        "y":y
                    })
                })
            })
        })
        return res;
    }

    render() {
        if (this.state.pivot==null||this.state.variables==null) {
            return null;
        }
        var data = this.getData(this.state.pivot,this.state.variables,this.state.data);
                 
        console.log(data)
        var typeX = this.state.pivot[0].type=='num'? 'linear':'point';
        console.log(this.state.variables)
        var typeY = this.state.variables.reduce((type,v) => {
            if (type=='point' || v.type=='str') {
                return 'point';
            } else {
                return type;
            } 
        },'linear')
        return(
            <div style={{height:400}}>
                <ResponsiveBar
        data={data}
        keys={[ 'hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut' ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
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
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
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