import React, {Component} from "react";
import ChartHandler from "./ChartHandler";
import MDHandler from "./MDHandler";
import Data from "./Data";
import Dropdown from 'react-bootstrap/Dropdown';

class Space extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'values':[],
            'sources':[]
        }
    }

    handleAddChart = () => {
        let state = this.state;
        state.values.push({id:'chart'})
        this.setState(state);
    }
    handleAddMD = () => {
        let state = this.state;
        state.values.push({id:'md'});
        this.setState(state);
    }

    render() {
        // consist of chart and note
        // similar concept to cell in jupyter notebook
        // const { isOver, canDrop, connectDropTarget, droppedItem } = this.props;
        var values = this.state.values;
        var contents = values.map((value,i)=> {
            if (value.id=='chart') {
                return <ChartHandler key={i}/>
            }
            if (value.id == 'md') {
                return <MDHandler key={i}/>
            }

        })

        var datas = this.state.sources.map((data,i)=><Data name={data.filename} features={data.features} data={data.data} key={i}/>)
        
        return (
            <div style={{'borderStyle':'dotted','borderColor':'blue','margin':'20px','padding':'20px','minHeight':'75px'}}>
                {datas}
                <Dropdown drop="left" style={{'display':'block','width':'auto','float':'right'}}>
                    <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" size="sm">
                    <b><big>+</big></b>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item key={1} onClick={this.handleAddChart}>Chart</Dropdown.Item>
                        <Dropdown.Item key={2} onClick={this.handleAddMD}>MD</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {contents}
            </div>
        )
    }
}

const spec = {
    drop(props, monitor, component) {
        const item = monitor.getItem()
        
        var state = component.state
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

// export default DropTarget("SOURCE", spec, collect)(Space);
export default Space;