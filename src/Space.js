import React, {Component} from "react";
import Chart from "./Chart"
import {DropTarget} from 'react-dnd';
import Data from "./Data"

class Space extends Component {
    constructor(props) {
        super(props);
        this.state = props.state;
        if (!this.state.values) {
            this.state['values'] = []
            this.state['sources'] = []
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
        const { isOver, canDrop, connectDropTarget, droppedItem } = this.props;
        var values = this.state.values;
        var contents = values.map((value,i)=> {
            if (value.id=='chart') {
                return <Chart key={i} state={value}/>
            }
        })

        var datas = this.state.sources.map((data,i)=><Data state={data} key={i}/>)
        
        return connectDropTarget(
            <div style={{'borderStyle':'dotted','borderColor':'blue','margin':'20px','padding':'20px'}}>
                Space:
                {datas}
                <button style={{'float':'right'}} onClick={this.handleAddChart}>+ Chart</button>
                {contents}
            </div>
        )
    }
}

const spec = {
    drop(props, monitor, component) {
        const item = monitor.getItem()
        
        var state = component.props.state
        state['sources'].push(item)
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

export default DropTarget("SOURCE", spec, collect)(Space);