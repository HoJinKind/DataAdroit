import React, {Component} from "react";
import Chart from "./Chart"

class Space extends Component {
    constructor(props) {
        super(props);
        this.state = props.state;
        if (!this.state.values) {
            this.state['values'] = []
        }
    }

    handleAddChart = () => {
        let state = this.state;
        state.values.push({id:'chart'})
        this.setState(state);
    }

    render() {
        // consist of chart and note
        // similar concept to cell in jupyter notebook
        var values = this.state.values;
        var contents = values.map((value,i)=> {
            if (value.id=='chart') {
                return <Chart key={i} state={value}/>
            }
        })
        
        return (
            <div style={{'border-style':'dotted','border-color':'blue','margin':'20px','padding':'20px'}}>
                Space:
                <button style={{'float':'right'}} onClick={this.handleAddChart}>+ Chart</button>
                {contents}
            </div>
        )
    }
}

export default Space;