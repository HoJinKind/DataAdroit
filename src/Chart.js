import React, {Component} from "react";
import MyDataviz from "./d3file"

class Chart extends Component {
    constructor(props) {
        super(props);
        console.log(window)
        this.state = props.state
        this.state.d = ''
    }

    

    render() {
        // Bar Chart, Pie Chart, Line Graph, Bubble Chart
        // Domains (x, y, color)

        var width=window.innerWidth-200;
        var height=window.innerHeight;
     
        return (
           
            <svg style={{width:width,height:height,'margin':10,'padding':10,'border-color':'red','border-style':'dotted'}}>
                <MyDataviz width={width} height={height}/>
                
            </svg>
        )
    }
}

export default Chart;