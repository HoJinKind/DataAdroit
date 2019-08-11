import React, {Component} from "react";
import { ResponsiveLine } from '@nivo/line';

class LineChart extends Component {
    constructor(props) {
        super(props);
        console.log('renew')
        this.state = {
            'pivot':props.pivot,
            'variables':props.variables,
            'data':props.data
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
        console.log(this.props.pivot,this.props.variables)
        if (this.props.pivot.length==0||this.props.variables.length==0) {
            return null;
        }
        var data = this.getData(this.props.pivot,this.props.variables,this.props.data);
        var typeX = this.props.pivot[0].type=='num'? 'linear':'point';
        var typeY = this.props.variables.reduce((type,v) => {
            if (type=='point' || v.type=='str') {
                return 'point';
            } else {
                return type;
            } 
        },'linear')
        return(
            <div style={{height:400}}>
                <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: typeX }}
                yScale={{ type: typeY, stacked: false, min: 'auto', max: 'auto' }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: this.props.pivot[0].name,
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'value',
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
                ]}/>
            </div>
        );
        
    }
}

export default LineChart;